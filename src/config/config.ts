import dotenv from "dotenv";

dotenv.config();

export const config = {
  database: "output/jobs.db",

  greenhouseBaseUrl:
    process.env.GREENHOUSE_BASE_URL ||
    "https://boards.greenhouse.io",

  scheduler: "*/30 * * * *",

  headless: true
};