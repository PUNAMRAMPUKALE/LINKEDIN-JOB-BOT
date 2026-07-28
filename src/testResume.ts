import { ResumeParser } from "./resume/ResumeParser";

async function test() {
    const parser = new ResumeParser();

    const skills = await parser.parse("./resumes/Punam_Pukale.pdf");

    console.log(skills);
}

test().catch(console.error);