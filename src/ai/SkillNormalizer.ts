export class SkillNormalizer {

    private aliases: Record<string, string> = {

        // JavaScript
        "js": "javascript",

        // TypeScript
        "ts": "typescript",

        // Node
        "node": "node.js",
        "nodejs": "node.js",

        // Go
        "golang": "go",

        // PostgreSQL
        "postgres": "postgresql",
        "postgresql": "postgresql",

        // Kubernetes
        "k8s": "kubernetes",
        "kube": "kubernetes",

        // GraphQL
        "graph ql": "graphql",

        // REST
        "restful": "rest",

        // AWS
        "amazon web services": "aws",

        // Azure
        "microsoft azure": "azure",

        // GCP
        "google cloud": "gcp",
        "google cloud platform": "gcp",

        // Terraform
        "tf": "terraform",

        // GitHub Actions
        "githubactions": "github actions",
        "gh actions": "github actions",

        // CI/CD
        "continuous integration": "ci/cd",
        "continuous delivery": "ci/cd",
        "continuous deployment": "ci/cd",

        // OAuth
        "oauth2": "oauth",

        // Microservices
        "microservice": "microservices",

        // Event Driven
        "event-driven": "event driven",

        // LLM
        "llms": "llm",
        "large language models": "llm",

        // RAG
        "retrieval augmented generation": "rag",

        // LangChain
        "lang chain": "langchain",

        // LangGraph
        "lang graph": "langgraph",

        // ElasticSearch
        "elastic search": "elasticsearch",

        // C#
        "csharp": "c#",

        // C++
        "cpp": "c++",

        // JWT
        "json web token": "jwt"
    };

    normalize(skills: string[]): string[] {

        const normalized = skills.map(skill => {

            const key = skill.trim().toLowerCase();

            return this.aliases[key] ?? key;

        });

        return [...new Set(normalized)];

    }

}