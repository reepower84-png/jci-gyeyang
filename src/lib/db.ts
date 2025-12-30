import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "inquiries.db");

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    const fs = require("fs");
    const dataDir = path.join(process.cwd(), "data");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    db = new Database(dbPath);

    db.exec(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_read INTEGER DEFAULT 0
      )
    `);
  }

  return db;
}

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  message: string;
  created_at: string;
  is_read: number;
}

export function addInquiry(name: string, phone: string, message: string): void {
  const db = getDatabase();
  const stmt = db.prepare(
    "INSERT INTO inquiries (name, phone, message) VALUES (?, ?, ?)"
  );
  stmt.run(name, phone, message);
}

export function getAllInquiries(): Inquiry[] {
  const db = getDatabase();
  const stmt = db.prepare(
    "SELECT * FROM inquiries ORDER BY created_at DESC"
  );
  return stmt.all() as Inquiry[];
}

export function markAsRead(id: number): void {
  const db = getDatabase();
  const stmt = db.prepare("UPDATE inquiries SET is_read = 1 WHERE id = ?");
  stmt.run(id);
}

export function deleteInquiry(id: number): void {
  const db = getDatabase();
  const stmt = db.prepare("DELETE FROM inquiries WHERE id = ?");
  stmt.run(id);
}

export function getUnreadCount(): number {
  const db = getDatabase();
  const stmt = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE is_read = 0");
  const result = stmt.get() as { count: number };
  return result.count;
}
