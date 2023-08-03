class URIParser {
    paramRegex = /{(.+)}/;
    match(uriParts, patternParts, params) {
        for (let i = 0; i < patternParts.length; i++) {
            const patternPart = patternParts[i];
            const uriPart = uriParts[i];
            if (patternPart === "**")
                return true;
            const paramMatch = this.paramRegex.exec(patternPart);
            if (uriPart && paramMatch) {
                params && (params[paramMatch[1]] = uriPart);
            }
            else if (patternPart !== "*" && patternPart !== uriPart) {
                return false;
            }
            if (i === uriParts.length - 1 && i < patternParts.length - 1 && patternParts[patternParts.length - 1] !== "") {
                return false;
            }
        }
        return true;
    }
    parse(uri, pattern, params) {
        const uriParts = uri.split("/");
        const patternParts = pattern.split("/");
        return this.match(uriParts, patternParts, params);
    }
}
export default new URIParser();
//# sourceMappingURL=URIParser.js.map