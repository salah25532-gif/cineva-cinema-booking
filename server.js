'use strict';
/** Cineva: zero-dependency, local Node.js cinema booking demo. No real payments. */
const http = require('node:http');
const fs = require('node:fs');
const { initialize, readDb, editDb } = require('./datastore');
const path = require('node:path');
const crypto = require('node:crypto');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 3000);
const ROOT = path.join(__dirname, 'public');
const DAY_MS = 86400000;
const ROWS = 'ABCDEFGH';
const SHOW_TIMES = ['14:30', '17:15', '20:00', '22:15'];
const MOVIES = [
  { id: 'nebula', title: 'Nebula Rising', titleAr: 'صعود السديم', genre: 'sci-fi', runtime: 128, age: 'PG-13', rating: 8.9, price: 7.00, year: 2026, color: '#65d4fa', image: '/assets/nebula.svg', desc: 'A lost signal from the farthest edge of the universe pulls one pilot into an impossible mission.', descAr: 'إشارة غامضة من أقاصي الكون تقود طيّارًا إلى مهمة لا تُصدق.' },
  { id: 'midnight', title: 'Midnight Chase', titleAr: 'مطاردة منتصف الليل', genre: 'action', runtime: 114, age: 'PG-13', rating: 8.5, price: 6.50, year: 2026, color: '#fa797c', image: '/assets/midnight.svg', desc: 'One night. One city. A race against a countdown that cannot be stopped.', descAr: 'ليلة واحدة ومدينة كاملة وسباق مع عدّ تنازلي لا يتوقف.' },
  { id: 'echo', title: 'Echoes of Time', titleAr: 'أصداء الزمن', genre: 'drama', runtime: 136, age: 'PG', rating: 9.1, price: 7.50, year: 2026, color: '#fabd87', image: '/assets/echo.svg', desc: 'A forgotten letter changes the course of two lives, separated by decades.', descAr: 'رسالة منسية تغيّر حياة شخصين فرّقتهما عقود من الزمن.' },
  { id: 'shadow', title: 'Shadow Protocol', titleAr: 'بروتوكول الظل', genre: 'thriller', runtime: 122, age: '16+', rating: 8.7, price: 7.00, year: 2026, color: '#a4a3fc', image: '/assets/shadow.svg', desc: 'A cybersecurity analyst uncovers a conspiracy hidden inside the most trusted network in the world.', descAr: 'محلل أمن سيبراني يكتشف مؤامرة داخل أكثر الشبكات ثقة في العالم.' },
  { id: 'blue', title: 'Beyond the Blue', titleAr: 'ما وراء الأزرق', genre: 'adventure', runtime: 119, age: 'PG', rating: 8.4, price: 6.00, year: 2026, color: '#70e3d7', image: '/assets/blue.svg', desc: 'Beneath the surface lies a world no explorer has ever returned to describe.', descAr: 'تحت سطح البحر عالم لم يعد أي مستكشف ليحكي قصته.' },
  { id: 'solstice', title: 'The Last Solstice', titleAr: 'الانقلاب الأخير', genre: 'sci-fi', runtime: 131, age: 'PG-13', rating: 8.8, price: 7.50, year: 2026, color: '#eccb78', image: '/assets/solstice.svg', desc: 'When daylight vanishes, a small team must restore the light before the world falls silent.', descAr: 'عندما يختفي ضوء النهار، يحاول فريق صغير إعادة النور قبل أن يصمت العالم.' }
];

function ammanParts(date = new Date()) { const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Amman', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(date); const v = Object.fromEntries(p.map(x => [x.type, x.value])); return { date: `${v.year}-${v.month}-${v.day}`, time: `${v.hour.padStart(2, '0')}:${v.minute}` }; }
function upcomingDates() { const today = ammanParts().date; return Array.from({ length: 5 }, (_, i) => { const d = new Date(`${today}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + i); return d.toISOString().slice(0, 10); }); }
function validShowing(movieId, date, time) { return MOVIES.some(m => m.id === movieId) && upcomingDates().includes(date) && SHOW_TIMES.includes(time) && `${date}T${time}` > `${ammanParts().date}T${ammanParts().time}`; }
function json(res, status, obj, moreHeaders = {}) { const data = Buffer.from(JSON.stringify(obj)); res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': data.length, 'Cache-Control': 'no-store', ...moreHeaders }); res.end(data); }
function error(res, status, message) { json(res, status, { error: message }); }
const attempts = new Map();
function cookies(req) { return Object.fromEntries((req.headers.cookie || '').split(';').map(x => x.trim().split('=').map(decodeURIComponent)).filter(p => p.length === 2)); }
function tokenDigest(token) { return crypto.createHash('sha256').update(token).digest('hex'); }
async function currentUser(req) {
  const token = cookies(req).cineva_session;
  if (!token || token.length > 100) return null;
  const db = await readDb();
  const session = db.sessions.find(s => s.tokenHash === tokenDigest(token) && s.expires > Date.now());
  if (!session) return null;
  const u = db.users.find(u => u.id === session.userId);
  return u ? { id: u.id, name: u.name, email: u.email } : null;
}
function cookieHeader(token, req) { return `cineva_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${req.socket.encrypted || req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : ''}`; }
async function startSession(req, res, user) {
  const token = crypto.randomBytes(32).toString('base64url');
  await editDb(db => {
    db.sessions = db.sessions.filter(s => s.expires > Date.now());
    db.sessions.push({ tokenHash: tokenDigest(token), userId: user.id, expires: Date.now() + 7 * DAY_MS });
  });
  json(res, 200, { user: { id: user.id, name: user.name, email: user.email } }, { 'Set-Cookie': cookieHeader(token, req) });
}
function scrypt(password, salt) { return crypto.scryptSync(password, salt, 64).toString('hex'); }
function validEmail(email) { return typeof email === 'string' && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function limitAuth(req, email) { const key = `${req.socket.remoteAddress}:${email}`; const now = Date.now(); let x = attempts.get(key) || { count: 0, reset: now + 15 * 60 * 1000 }; if (now > x.reset) x = { count: 0, reset: now + 15 * 60 * 1000 }; x.count++; attempts.set(key, x); if (attempts.size > 4000) attempts.clear(); return x.count <= 12; }
function readBody(req) { return new Promise((resolve, reject) => { let size = 0; const chunks = []; req.on('data', c => { size += c.length; if (size > 32 * 1024) { reject({ status: 413, message: 'Request is too large.' }); req.destroy(); } else chunks.push(c); }); req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { reject({ status: 400, message: 'Invalid JSON.' }); } }); req.on('error', reject); }); }
function confirmSameOrigin(req) { if (req.method === 'GET' || req.method === 'HEAD') return true; const origin = req.headers.origin; if (!origin) return true; try { const url = new URL(origin); return url.host === req.headers.host && (url.protocol === 'http:' || url.protocol === 'https:'); } catch { return false; } }
function getSeats(db, movieId, date, time) { return [...new Set(db.bookings.filter(b => b.movieId === movieId && b.date === date && b.time === time).flatMap(b => b.seats))]; }
function priceBreakdown(movie, seats) { const base = seats.reduce((sum, seat) => sum + movie.price + ('GH'.includes(seat[0]) ? 2.5 : 0), 0); const fee = seats.length * 0.5; return { subtotal: Number(base.toFixed(2)), fee: Number(fee.toFixed(2)), total: Number((base + fee).toFixed(2)), currency: 'JOD' }; }
function safeBooking(b) { const movie = MOVIES.find(m => m.id === b.movieId); return { ...b, movie: { title: movie.title, titleAr: movie.titleAr, image: movie.image, genre: movie.genre } }; }
function isValidSeat(s) { return typeof s === 'string' && /^[A-H](?:[1-9]|1[0-2])$/.test(s); }

async function api(req, res, pathname, url) {
  if (req.method !== 'GET' && req.method !== 'POST') return error(res, 405, 'Method not allowed.');
  if (!confirmSameOrigin(req)) return error(res, 403, 'Untrusted origin.');
  if (req.method === 'GET' && pathname === '/api/config') return json(res, 200, { movies: MOVIES, dates: upcomingDates(), times: SHOW_TIMES, today: ammanParts().date, currency: 'JOD' });
  if (req.method === 'GET' && pathname === '/api/auth/me') return json(res, 200, { user: await currentUser(req) });
  if (req.method === 'GET' && pathname === '/api/seats') {
    const { movieId, date, time } = Object.fromEntries(url.searchParams);
    if (!validShowing(movieId, date, time)) return error(res, 400, 'Please choose an available showing.');
    return json(res, 200, { taken: getSeats(await readDb(), movieId, date, time) });
  }
  if (req.method === 'POST' && pathname === '/api/auth/register') {
    const b = await readBody(req); if (!b || typeof b !== 'object') return error(res, 400, 'Invalid request body.'); const name = typeof b.name === 'string' ? b.name.trim() : ''; const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : ''; const password = b.password;
    if (name.length < 2 || name.length > 70 || !validEmail(email) || typeof password !== 'string' || password.length < 8 || password.length > 128) return error(res, 400, 'Use a valid name, email, and password (8–128 characters).');
    if (!limitAuth(req, email)) return error(res, 429, 'Too many attempts. Try again later.');
    const salt = crypto.randomBytes(16).toString('hex');
    const user = { id: crypto.randomUUID(), name, email, salt, hash: scrypt(password, salt), createdAt: new Date().toISOString() };
    await editDb(db => {
      if (db.users.some(u => u.email === email)) throw { status: 409, message: 'This email is already registered.' };
      db.users.push(user);
    });
    return startSession(req, res, user);
  }
  if (req.method === 'POST' && pathname === '/api/auth/login') {
    const b = await readBody(req); if (!b || typeof b !== 'object') return error(res, 400, 'Invalid request body.'); const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : ''; const password = b.password;
    if (!validEmail(email) || typeof password !== 'string' || !limitAuth(req, email)) return error(res, 401, 'Unable to log in. Check credentials or try later.');
    const db = await readDb(), u = db.users.find(u => u.email === email); const salt = u ? u.salt : '0'.repeat(32), expected = u ? u.hash : '0'.repeat(128); const hash = scrypt(password, salt);
    if (!u || !crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(expected, 'hex'))) return error(res, 401, 'Incorrect email or password.');
    attempts.delete(`${req.socket.remoteAddress}:${email}`); return startSession(req, res, u);
  }
  if (req.method === 'POST' && pathname === '/api/auth/logout') {
    const token = cookies(req).cineva_session;
    if (token && token.length <= 100) await editDb(db => { db.sessions = db.sessions.filter(s => s.tokenHash !== tokenDigest(token)); });
    return json(res, 200, { ok: true }, { 'Set-Cookie': 'cineva_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0' });
  }
  if (pathname === '/api/bookings' && req.method === 'GET') {
    const user = await currentUser(req); if (!user) return error(res, 401, 'Please sign in first.');
    return json(res, 200, { bookings: (await readDb()).bookings.filter(b => b.userId === user.id).reverse().map(safeBooking) });
  }
  if (pathname === '/api/bookings' && req.method === 'POST') {
    const user = await currentUser(req); if (!user) return error(res, 401, 'Please sign in first.');
    const b = await readBody(req); if (!b || !validShowing(b.movieId, b.date, b.time) || !Array.isArray(b.seats) || b.seats.length < 1 || b.seats.length > 8 || !b.seats.every(isValidSeat) || new Set(b.seats).size !== b.seats.length) return error(res, 400, 'Invalid showing or seat selection (1–8 seats).');
    const movie = MOVIES.find(m => m.id === b.movieId);
    const booking = { id: crypto.randomUUID(), code: 'CV-' + crypto.randomBytes(4).toString('hex').toUpperCase(), userId: user.id, movieId: b.movieId, date: b.date, time: b.time, seats: [...b.seats].sort(), ...priceBreakdown(movie, b.seats), createdAt: new Date().toISOString(), status: 'CONFIRMED', paymentStatus: 'DEMO — NO PAYMENT' };
    await editDb(db => {
      const taken = new Set(getSeats(db, b.movieId, b.date, b.time));
      if (b.seats.some(s => taken.has(s))) throw { status: 409, message: 'Some seats have just been booked. Please select other seats.' };
      db.bookings.push(booking);
    });
    return json(res, 201, { booking: safeBooking(booking) });
  }
  return error(res, 404, 'API route not found.');
}

function serve(req, res, pathname) {
  if (!['GET', 'HEAD'].includes(req.method)) return error(res, 405, 'Method not allowed.');
  const cleanPath = pathname === '/' ? '/index.html' : pathname;
  let filepath;
  try { filepath = path.resolve(ROOT, '.' + decodeURIComponent(cleanPath)); } catch { return error(res, 400, 'Invalid path.'); }
  if (!filepath.startsWith(ROOT + path.sep)) return error(res, 403, 'Forbidden.');
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
  const type = types[path.extname(filepath)]; if (!type) return error(res, 404, 'Not found.');
  fs.stat(filepath, (e, s) => {
    if (e || !s.isFile()) return error(res, 404, 'Not found.');
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': s.size, 'Cache-Control': 'public, max-age=3600' });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filepath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'; connect-src 'self'; font-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'self'");
  let url; try { url = new URL(req.url, `http://${req.headers.host || 'localhost'}`); } catch { return error(res, 400, 'Invalid URL.'); }
  try { return url.pathname.startsWith('/api/') ? await api(req, res, url.pathname, url) : serve(req, res, url.pathname); }
  catch (e) { if (!res.headersSent && !res.destroyed) error(res, e.status || 500, e.status ? e.message : 'Unexpected server error.'); if (!e.status) console.error(e); }
});
initialize().then(() => server.listen(PORT, HOST, () => {
  console.log(`\nCINEVA is running at http://${HOST}:${PORT}\nPress Ctrl+C to stop.\n`);
})).catch(err => { console.error('Could not initialize database:', err); process.exit(1); });
