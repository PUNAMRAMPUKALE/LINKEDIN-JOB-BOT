import sqlite3 from "sqlite3";
import { Job } from "../models/Job";
import { Database } from "../database/database";

export class JobRepository {
  private db: sqlite3.Database;

  constructor(database: Database) {
    this.db = database.getConnection();
  }

  save(job: Job): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `
        INSERT OR REPLACE INTO jobs
        (
          title,
          company,
          location,
          description,
          url,
          source,
          postedDate,
          employmentType,
          salary,
          score,
          matchedSkills,
          missingSkills,
          scrapedAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          job.title,
          job.company,
          job.location,
          job.description,
          job.url,
          job.source,
          job.postedDate ?? "",
          job.employmentType ?? "",
          job.salary ?? "",
          job.score ?? 0,
          JSON.stringify(job.matchedSkills ?? []),
          JSON.stringify(job.missingSkills ?? []),
          job.scrapedAt,
        ],
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        }
      );
    });
  }

  findAll(): Promise<Job[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `
        SELECT *
        FROM jobs
        ORDER BY score DESC
        `,
        [],
        (err, rows: any[]) => {
          if (err) {
            reject(err);
            return;
          }

          const jobs: Job[] = rows.map((row) => ({
            ...row,
            matchedSkills: JSON.parse(row.matchedSkills ?? "[]"),
            missingSkills: JSON.parse(row.missingSkills ?? "[]"),
          }));

          resolve(jobs);
        }
      );
    });
  }
}