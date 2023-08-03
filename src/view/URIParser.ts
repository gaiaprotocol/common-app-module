import { ViewParams } from "./View.js";

class URIParser {
    private paramRegex = /{(.+)}/;

    public match(uriParts: string[], patternParts: string[], params?: ViewParams): boolean {
        for (let i = 0; i < patternParts.length; i++) {
            const patternPart = patternParts[i];
            const uriPart = uriParts[i];

            if (!patternPart) return false;

            if (patternPart === "**") return true;

            const paramMatch = this.paramRegex.exec(patternPart);

            if (uriPart && paramMatch) {
                params && (params[paramMatch[1]] = uriPart);
            } else if (patternPart !== "*" && patternPart !== uriPart) {
                return false;
            }

            if (i === uriParts.length - 1 && i < patternParts.length - 1 && patternParts[patternParts.length - 1] !== "") {
                return false;
            }
        }
        return true;
    }

    public parse(uri: string, pattern: string, params: ViewParams): boolean {
        const uriParts = uri.split("/");
        const patternParts = pattern.split("/");
        return this.match(uriParts, patternParts, params);
    }
}

export default new URIParser();
