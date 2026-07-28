export interface Job {
    id?: number;

    title: string;

    company: string;

    location: string;

    url: string;

    description: string;

    source: string;

    salary?: string;

    employmentType?: string;

    postedDate?: string;

    score?: number;

    matchedSkills?: string[];

    missingSkills?: string[];

    scrapedAt: string;
    
}