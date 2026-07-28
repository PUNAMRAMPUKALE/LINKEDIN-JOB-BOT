import { SKILLS } from "../constants/skills";

export class SkillExtractor {

    extract(text: string): string[] {

        const lower = text.toLowerCase();

        const found = new Set<string>();

        Object.values(SKILLS).flat().forEach(skill => {

            if (lower.includes(skill.toLowerCase())) {

                found.add(skill);

            }

        });

        return [...found];

    }

}