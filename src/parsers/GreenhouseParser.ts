import { Job } from "../models/Job";

export class GreenhouseParser {

  parse(rawJobs: any[], company: string): Job[] {

    return rawJobs.map(job => ({
      title: job.title,

      company,

      location: job.location?.name ?? "Unknown",

      description: "",

      url: job.absolute_url,

      source: "Greenhouse",

      postedDate: "",

      employmentType: "",

      salary: "",

      score: 0,

      matchedSkills: [],

      scrapedAt: new Date().toISOString()
    }));

  }

}