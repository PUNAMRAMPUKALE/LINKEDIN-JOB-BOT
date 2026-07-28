import { Job } from "../models/Job";
import { JobSkillExtractor } from "../ai/JobSkillExtractor";
import { ATSMatcher } from "../ai/ATSMatcher";

export class JobScorer {

    private extractor = new JobSkillExtractor();
    private matcher = new ATSMatcher();

    score(job: Job, resumeSkills: string[]) {

        const text = `
            ${job.title}
            ${job.description}
        `;

        const jobSkills = this.extractor.extract(text);

        console.log("\n========================================");
        console.log(job.title);
        console.log("Extracted Skills:", jobSkills);

        return this.matcher.match(resumeSkills, jobSkills);
    }
}