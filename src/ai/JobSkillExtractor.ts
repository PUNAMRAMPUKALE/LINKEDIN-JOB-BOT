const KNOWN_SKILLS = [
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
    "ai",
    "machine learning"
];

export class JobSkillExtractor {

    extract(text: string): string[] {

        const lower = text.toLowerCase();

        return KNOWN_SKILLS.filter(skill =>
            lower.includes(skill)
        );
    }

}