
import { SkillNormalizer } from "./SkillNormalizer";
import { SKILL_PATTERNS } from "./SkillPatterns";

export class JobSkillExtractor {

    private normalizer = new SkillNormalizer();

    extract(text: string): string[] {

        const cleanText = text
            .replace(/<[^>]*>/g, " ")
            .replace(/&nbsp;/gi, " ")
            .replace(/&amp;/gi, "&")
            .replace(/&lt;/gi, "<")
            .replace(/&gt;/gi, ">")
            .replace(/\s+/g, " ")
            .toLowerCase();

        const found: string[] = [];

        for (const item of SKILL_PATTERNS) {

    for (const pattern of item.patterns) {

        const escaped = pattern.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(
            `\\b${escaped}\\b`,
            "i"
        );

        if (regex.test(cleanText)) {

            found.push(item.skill);

            break;
        }
    }
}

        return this.normalizer.normalize(found);
    }
}