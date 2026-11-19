'use strict';
/** Local JSON for offline demos, or PostgreSQL when DATABASE_URL is supplied. */
const fs = require('node:fs');
const path = require('node:path');
const FOLDER = path.join(__dirname, 'storage');
const FILE = path.join(FOLDER, 'data.json');
const initial = () => ({ users: [], bookings: [], sessions: [], passwordResets: [] });

let pool = null;
let ready = null;
if (process.env.DATABASE_URL) {
  // Only required in cloud deployments; offline/local mode remains dependency-free.
  const { Pool } = require('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000
  });
} else if (process.env.NODE_ENV === 'production') {
  throw new Error('DATABASE_URL is required for public deployment so bookings survive restarts.');
} else {
  fs.mkdirSync(FOLDER, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify(initial(), null, 2));
}
function ensureShape(db) {
  if (!db || typeof db !== 'object') throw new Error('Invalid stored database data.');
  for (const key of ['users', 'bookings', 'sessions', 'passwordResets']) if (!Array.isArray(db[key])) db[key] = [];
  return db;
}
async function initialize() {
  if (!pool) return;
  if (!ready) {
    ready = (async () => {
      await pool.query(`CREATE TABLE IF NOT EXISTS cineva_state (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        document JSONB NOT NULL
      )`);
      await pool.query(`INSERT INTO cineva_state (id, document) VALUES (1, $1::jsonb)
        ON CONFLICT (id) DO NOTHING`, [JSON.stringify(initial())]);
    })();
  }
  return ready;
}
async function readDb() {
  if (!pool) return ensureShape(JSON.parse(fs.readFileSync(FILE, 'utf8')));
  await initialize();
  const result = await pool.query('SELECT document FROM cineva_state WHERE id = 1');
  return ensureShape(result.rows[0].document);
}
async function editDb(modify) {
  if (!pool) {
    const db = await readDb();
    const result = await modify(db);
    const tmp = FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
    fs.renameSync(tmp, FILE);
    return result;
  }
  await initialize();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Serializes booking and registration writes across server instances.
    const result = await client.query('SELECT document FROM cineva_state WHERE id = 1 FOR UPDATE');
    const db = ensureShape(result.rows[0].document);
    const value = await modify(db);
    await client.query('UPDATE cineva_state SET document = $1::jsonb WHERE id = 1', [JSON.stringify(db)]);
    await client.query('COMMIT');
    return value;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
module.exports = { initialize, readDb, editDb };
