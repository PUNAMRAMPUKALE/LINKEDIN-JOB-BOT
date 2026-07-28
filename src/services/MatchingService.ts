import { JobSkillExtractor } from "../ai/JobSkillExtractor";
import { JobMatcher } from "../ai/JobMatcher";

export class MatchingService {

    private extractor = new JobSkillExtractor();

    private matcher = new JobMatcher();

    match(job: any, resumeSkills: string[]) {

        const jobText = `
${job.title ?? ""}

${job.content ?? job.description ?? ""}
`;

        const jobSkills = this.extractor.extract(jobText);

        // Debug (remove after testing)
        console.log("========================================");
        console.log(job.title);
        console.log("Extracted Skills:", jobSkills);

        return this.matcher.score(
            resumeSkills,
            jobSkills
        );

    }

}