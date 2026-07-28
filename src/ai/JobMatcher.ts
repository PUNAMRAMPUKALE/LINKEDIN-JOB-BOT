import { SkillNormalizer } from "./SkillNormalizer";

export class JobMatcher {

    private normalizer = new SkillNormalizer();

    score(
        resumeSkills:string[],
        jobSkills:string[]
    ){

        const resume=this.normalizer.normalize(resumeSkills);

        const job=this.normalizer.normalize(jobSkills);

        const matched=job.filter(skill=>resume.includes(skill));

        const missing=job.filter(skill=>!resume.includes(skill));

        const score=job.length
            ?Math.round(
                matched.length/job.length*100
             )
            :0;

        return{

            score,

            matchedSkills:matched,

            missingSkills:missing
        };

    }

}