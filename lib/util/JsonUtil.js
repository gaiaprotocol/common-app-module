class JsonUtil {
    parseWithUndefined(data) {
        if (data === null) {
            return undefined;
        }
        return JSON.parse(data, (k, v) => v === null ? undefined : v);
    }
}
export default new JsonUtil();
//# sourceMappingURL=JsonUtil.js.map