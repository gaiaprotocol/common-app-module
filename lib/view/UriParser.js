class UriParser {
    paramRegex = /{(.+)}/;
    _match(uriParts, patternParts, params) {
        for (let i = 0; i < uriParts.length; i++) {
            const patternPart = patternParts[i];
            if (patternPart === undefined)
                return false;
            let uriPart = uriParts[i];
            if (patternPart === "**")
                return true;
            const paramMatch = this.paramRegex.exec(patternPart);
            if (!patternPart.startsWith("{")) {
                const index = patternPart.indexOf("{");
                if (uriPart.substring(0, index) !== patternPart.substring(0, index)) {
                    return false;
                }
                else {
                    uriPart = uriPart.substring(index);
                }
            }
            if (uriPart && paramMatch) {
                params[paramMatch[1]] = uriPart;
            }
            else if (patternPart !== "*" && patternPart !== uriPart) {
                return false;
            }
            if (i === uriParts.length - 1 && i < patternParts.length - 1 &&
                patternParts[patternParts.length - 1] !== "") {
                return false;
            }
        }
        return true;
    }
    match(uriParts, patternParts, params) {
        const newParams = {};
        const result = this._match(uriParts, patternParts, newParams);
        if (result && params)
            Object.assign(params, newParams);
        return result;
    }
    parse(uri, pattern, params) {
        const uriParts = uri.split("/");
        const patternParts = pattern.split("/");
        return this.match(uriParts, patternParts, params);
    }
}
export default new UriParser();
//# sourceMappingURL=UriParser.js.map