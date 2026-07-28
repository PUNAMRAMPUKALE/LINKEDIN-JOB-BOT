import { SkillNormalizer } from "./SkillNormalizer";

export class ATSMatcher{

    private normalizer=new SkillNormalizer();

    match(resumeSkills:string[],jobSkills:string[]){

        const resume=this.normalizer.normalize(resumeSkills);

        const job=this.normalizer.normalize(jobSkills);

        const matched=job.filter(skill=>resume.includes(skill));

        const missing=job.filter(skill=>!resume.includes(skill));

        const score=job.length===0
            ?0
            :Math.round((matched.length/job.length)*100);

        return{

            score,

            matchedSkills:matched,

            missingSkills:missing

        };

    }

}