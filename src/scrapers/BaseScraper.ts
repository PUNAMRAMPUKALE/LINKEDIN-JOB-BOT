import { Job } from "../models/Job";

export interface SearchCriteria {
  keywords: string[];
  location?: string;
  remote?: boolean;
}

export abstract class BaseScraper {
  abstract source: string;

  abstract scrape(criteria: SearchCriteria): Promise<Job[]>;
}