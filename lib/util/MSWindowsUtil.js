class MSWindowsUtil {
    parseWithUndefined(data) {
        if (data === null) {
            return undefined;
        }
        return JSON.parse(data, (k, v) => v === null ? undefined : v);
    }
}
export default new MSWindowsUtil();
//# sourceMappingURL=MSWindowsUtil.js.map