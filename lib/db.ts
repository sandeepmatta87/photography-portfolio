import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'photography.db');

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    // Ensure directory exists
    const fs = require('fs');
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initDb(db);
  }
  return db;
}

function initDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS quotes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      eventType TEXT NOT NULL,
      eventDate TEXT,
      venue TEXT,
      guests TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      createdAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      invoiceNumber TEXT UNIQUE NOT NULL,
      quoteId TEXT,
      clientName TEXT NOT NULL,
      clientEmail TEXT NOT NULL,
      clientPhone TEXT,
      type TEXT NOT NULL DEFAULT 'booking',
      items TEXT NOT NULL DEFAULT '[]',
      subtotal REAL DEFAULT 0,
      taxRate REAL DEFAULT 10,
      tax REAL DEFAULT 0,
      total REAL DEFAULT 0,
      status TEXT DEFAULT 'draft',
      dueDate TEXT,
      notes TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (quoteId) REFERENCES quotes(id)
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      invoiceId TEXT NOT NULL,
      amount REAL NOT NULL,
      method TEXT DEFAULT 'bank_transfer',
      reference TEXT,
      paidAt TEXT DEFAULT (datetime('now')),
      notes TEXT,
      FOREIGN KEY (invoiceId) REFERENCES invoices(id)
    );
  `);
}

export default getDb;

// Helper: generate next invoice number
export function getNextInvoiceNumber(): string {
  const db = getDb();
  const year = new Date().getFullYear();
  const row = db.prepare(
    `SELECT invoiceNumber FROM invoices WHERE invoiceNumber LIKE ? ORDER BY invoiceNumber DESC LIMIT 1`
  ).get(`INV-${year}-%`) as { invoiceNumber: string } | undefined;

  if (!row) return `INV-${year}-001`;

  const lastNum = parseInt(row.invoiceNumber.split('-')[2], 10);
  return `INV-${year}-${String(lastNum + 1).padStart(3, '0')}`;
}
