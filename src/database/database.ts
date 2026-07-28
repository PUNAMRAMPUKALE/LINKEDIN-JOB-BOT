import sqlite3 from "sqlite3";
import { config } from "../config/config";
import { logger } from "../utils/logger";

sqlite3.verbose();

export class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(config.database);
  }

  initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `
        CREATE TABLE IF NOT EXISTS jobs (

          id INTEGER PRIMARY KEY AUTOINCREMENT,

          title TEXT NOT NULL,

          company TEXT NOT NULL,

          location TEXT,

          description TEXT,

          url TEXT UNIQUE,

          source TEXT,

          postedDate TEXT,

          employmentType TEXT,

          salary TEXT,

          score REAL DEFAULT 0,

          matchedSkills TEXT,

          missingSkills TEXT,

          scrapedAt TEXT

        )
        `,
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          logger.info("Database initialized.");
          resolve();
        }
      );
    });
  }

  getConnection(): sqlite3.Database {
    return this.db;
  }
}