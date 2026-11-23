'use strict';
// تخزين محلي للتجربة أو PostgreSQL عند توفر رابط الاتصال.
// استدعاء أدوات قراءة الملفات والمسارات.
const fs = require('node:fs');
const path = require('node:path');
// تحديد مكان ملف البيانات المحلي.
const FOLDER = path.join(__dirname, 'storage');
const FILE = path.join(FOLDER, 'data.json');
// إنشاء الهيكل الأساسي للحسابات والحجوزات والجلسات.
const initial = () => ({ users: [], bookings: [], sessions: [], passwordResets: [] });

// تجهيز اتصال قاعدة البيانات عند توفر DATABASE_URL.
let pool = null;
let ready = null;
// اختيار PostgreSQL للنشر أو ملف JSON للتشغيل المحلي.
if (process.env.DATABASE_URL) {
  // استدعاء PostgreSQL عند تشغيل قاعدة البيانات السحابية فقط.
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
// التأكد من وجود أقسام البيانات المطلوبة.
function ensureShape(db) {
  if (!db || typeof db !== 'object') throw new Error('Invalid stored database data.');
  for (const key of ['users', 'bookings', 'sessions', 'passwordResets']) if (!Array.isArray(db[key])) db[key] = [];
  return db;
}
// إنشاء جدول التخزين وتجهيز السجل الأساسي.
async function initialize() {
  if (!pool) return;
  if (!ready) {
    ready = (async () => {
      // إعادة تسمية الجدول السابق مع الحفاظ على الحسابات والحجوزات.
      await pool.query(`DO $$
        BEGIN
          IF to_regclass('public.cineva_state') IS NOT NULL
             AND to_regclass('public.movie_house_state') IS NULL THEN
            ALTER TABLE public.cineva_state RENAME TO movie_house_state;
          END IF;
        END $$;`);
      await pool.query(`CREATE TABLE IF NOT EXISTS movie_house_state (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        document JSONB NOT NULL
      )`);
      await pool.query(`INSERT INTO movie_house_state (id, document) VALUES (1, $1::jsonb)
        ON CONFLICT (id) DO NOTHING`, [JSON.stringify(initial())]);
    })();
  }
  return ready;
}
// قراءة البيانات من المصدر المستخدم حاليًا.
async function readDb() {
  if (!pool) return ensureShape(JSON.parse(fs.readFileSync(FILE, 'utf8')));
  await initialize();
  const result = await pool.query('SELECT document FROM movie_house_state WHERE id = 1');
  return ensureShape(result.rows[0].document);
}
// حفظ التعديلات مع المحافظة على سلامة البيانات.
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
  // بدء معاملة قاعدة البيانات لعمليات الكتابة.
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // قفل السجل لمنع تعارض عمليات الحجز والتسجيل.
    const result = await client.query('SELECT document FROM movie_house_state WHERE id = 1 FOR UPDATE');
    const db = ensureShape(result.rows[0].document);
    const value = await modify(db);
    await client.query('UPDATE movie_house_state SET document = $1::jsonb WHERE id = 1', [JSON.stringify(db)]);
    // تثبيت التعديل بعد نجاح العملية.
    await client.query('COMMIT');
    return value;
  } catch (err) {
    // التراجع عن أي تعديل إذا حدث خطأ.
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
// إتاحة وظائف قاعدة البيانات للخادم.
module.exports = { initialize, readDb, editDb };