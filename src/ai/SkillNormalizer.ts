const aliases: Record<string,string> = {

    node:"node.js",

    js:"javascript",

    ts:"typescript",

    postgres:"postgresql",

    k8s:"kubernetes",

    ml:"machine learning",

    llms:"llm",

    awscloud:"aws"
};

export class SkillNormalizer{

    normalize(skills:string[]):string[]{

        return [...new Set(

            skills.map(skill=>{

                const key=skill.toLowerCase();

                return aliases[key] || key;

            })

        )];

    }

}