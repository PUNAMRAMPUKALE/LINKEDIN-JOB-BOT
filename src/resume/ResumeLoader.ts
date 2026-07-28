import * as fs from "fs";
const pdfParse = require("pdf-parse");

export class ResumeLoader {
  async load(filePath: string): Promise<string> {
    const buffer = fs.readFileSync(filePath);

    const pdf = await pdfParse(buffer);

    return pdf.text;
  }
}