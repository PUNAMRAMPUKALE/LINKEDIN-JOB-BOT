import { Job } from "../models/Job";

export class JobScorer {

    score(job: Job, resumeSkills: string[]) {

        const text =
            `${job.title}
             ${job.description}`.toLowerCase();

        const matchedSkills: string[] = [];

        const missingSkills: string[] = [];

        for (const skill of resumeSkills) {

            if (text.includes(skill.toLowerCase())) {

                matchedSkills.push(skill);

            }

        }

        const commonJobSkills = [

            "node",

            "node.js",

            "typescript",

            "javascript",

            "react",

            "express",

            "graphql",

            "aws",

            "docker",

            "kubernetes",

            "postgresql",

            "mongodb",

            "redis",

            "langchain",

            "langgraph",

            "openai",

            "rag",

            "llm",

            "terraform"

        ];

        for (const skill of commonJobSkills) {

            if (
                text.includes(skill) &&
                !matchedSkills.includes(skill)
            ) {
                missingSkills.push(skill);
            }
        }

        const score =
            Math.min(
                100,
                matchedSkills.length * 10
            );

        return {

            score,

            matchedSkills,

            missingSkills

        };

    }

}