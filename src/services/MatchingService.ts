import { JobSkillExtractor } from "../ai/JobSkillExtractor";
import { JobMatcher } from "../ai/JobMatcher";

export class MatchingService{

    private extractor=new JobSkillExtractor();

    private matcher=new JobMatcher();

    match(job,resumeSkills){

        const jobSkills=this.extractor.extract(

            `${job.title}
             ${job.description}`

        );

        return this.matcher.score(

            resumeSkills,

            jobSkills

        );

    }

}