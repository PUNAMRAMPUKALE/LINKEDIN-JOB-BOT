import { ResumeLoader } from "./ResumeLoader";
import { SkillExtractor } from "./SkillExtractor";

export class ResumeParser {
  private loader = new ResumeLoader();
  private extractor = new SkillExtractor();

  async parse(filePath: string): Promise<string[]> {
    const resumeText = await this.loader.load(filePath);

    return this.extractor.extract(resumeText);
  }
}