import { Job } from "../models/Job";

export class JobScorer {

    private readonly aliases: Record<string, string> = {
        node: "node.js",
        js: "javascript",
        ts: "typescript",
        postgres: "postgresql",
        k8s: "kubernetes",
        llms: "llm",
        ml: "machine learning"
    };

    private readonly knownSkills = [

        "javascript",
        "typescript",
        "node.js",
        "node",
        "react",
        "angular",
        "vue",
        "python",
        "java",
        "spring",
        "spring boot",
        "express",
        "nestjs",
        "graphql",
        "rest",
        "mongodb",
        "mysql",
        "postgresql",
        "redis",
        "docker",
        "kubernetes",
        "aws",
        "azure",
        "gcp",
        "terraform",
        "jenkins",
        "git",
        "github",
        "ci/cd",
        "microservices",
        "rabbitmq",
        "kafka",
        "elasticsearch",
        "langchain",
        "langgraph",
        "openai",
        "pinecone",
        "weaviate",
        "rag",
        "llm",
        "machine learning"
    ];

    private normalize(skills: string[]): string[] {

        return [
            ...new Set(
                skills.map(skill => {

                    const key = skill.toLowerCase();

                    return this.aliases[key] || key;

                })
            )
        ];

    }

    score(job: Job, resumeSkills: string[]) {

        const text = `
            ${job.title}
            ${job.description}
        `.toLowerCase();

        const jobSkills = this.normalize(

            this.knownSkills.filter(skill =>
                text.includes(skill.toLowerCase())
            )

        );

        const resume = this.normalize(resumeSkills);

        const matchedSkills = jobSkills.filter(skill =>
            resume.includes(skill)
        );

        const missingSkills = jobSkills.filter(skill =>
            !resume.includes(skill)
        );

        const score =
            jobSkills.length === 0
                ? 0
                : Math.round(
                    (matchedSkills.length / jobSkills.length) * 100
                );

        return {
            score,
            matchedSkills,
            missingSkills
        };
    }
}