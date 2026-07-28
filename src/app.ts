import { Database } from "./database/database";
import { JobRepository } from "./repositories/JobRepository";
import { GreenhouseScraper } from "./scrapers/GreenhouseScraper";
import { logger } from "./utils/logger";
import { ResumeParser } from "./resume/ResumeParser";
import { JobScorer } from "./scoring/JobScorer";

async function bootstrap() {
  try {
    logger.info("=================================");
    logger.info("AI Job Aggregator Starting...");
    logger.info("=================================");

    // Initialize database
    const db = new Database();
    await db.initialize();

    // Create repository
    const repository = new JobRepository(db);

    // Create scraper
    const greenhouse = new GreenhouseScraper();

    // Parse resume once
    const resumeParser = new ResumeParser();
    const resumeSkills = await resumeParser.parse(
      "./resumes/Punam_Pukale.pdf"
    );

    logger.info(
      `Extracted ${resumeSkills.length} skills from resume`
    );

    // Create scorer
    const scorer = new JobScorer();

    // Search criteria
    const jobs = await greenhouse.scrape({
      keywords: [
        "Node.js",
        "Backend",
        "TypeScript",
        "JavaScript",
        "Software Engineer",
        "Full Stack",
      ],
      location: "United States",
      remote: true,
    });

    logger.info(`Found ${jobs.length} matching jobs`);

    // Score and save jobs
    for (const job of jobs) {
  const result = scorer.score(job, resumeSkills);

  job.score = result.score;
  job.matchedSkills = result.matchedSkills;
  job.missingSkills = result.missingSkills;

  job.scrapedAt = new Date().toISOString();

  await repository.save(job);
}

    // Sort by highest score
    jobs.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    logger.info(`${jobs.length} jobs saved to SQLite.`);

    console.table(
      jobs.map((job) => ({
        Score: job.score,
        Company: job.company,
        Title: job.title,
        Location: job.location,
        Matched: job.matchedSkills?.join(", "),
        Missing: job.missingSkills?.join(", "),
      }))
    );

    logger.info("Application initialized successfully.");
  } catch (error) {
    logger.error(`Startup failed: ${error}`);

    if (error instanceof Error) {
      logger.error(error.stack ?? "");
    }

    process.exit(1);
  }
}

bootstrap();