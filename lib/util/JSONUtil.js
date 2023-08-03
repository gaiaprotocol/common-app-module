export default class JSONUtil {
    static parseWithUndefined(data) {
        if (data === null) {
            return undefined;
        }
        return JSON.parse(data, (k, v) => v === null ? undefined : v);
    }
}
//# sourceMappingURL=JSONUtil.js.map