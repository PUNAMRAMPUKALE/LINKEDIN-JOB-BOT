import { BaseScraper, SearchCriteria } from "./BaseScraper";
import { Job } from "../models/Job";

import { GreenhouseService } from "../services/GreenhouseService";
import { GreenhouseParser } from "../parsers/GreenhouseParser";

import companies from "../../companies/greenhouse.json";

export class GreenhouseScraper extends BaseScraper {

  source = "Greenhouse";

  private service = new GreenhouseService();

  private parser = new GreenhouseParser();

  async scrape(criteria: SearchCriteria): Promise<Job[]> {

    const jobs: Job[] = [];

    for (const company of companies) {

      console.log(`Searching ${company}`);

      const rawJobs = await this.service.fetch(company);

      const parsed = this.parser.parse(rawJobs, company);

      const filtered = parsed.filter(job => {

        const title = job.title.toLowerCase();

        return criteria.keywords.some(keyword =>
          title.includes(keyword.toLowerCase())
        );

      });

      jobs.push(...filtered);

    }

    return jobs;

  }

}