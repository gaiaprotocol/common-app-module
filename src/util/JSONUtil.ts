export default class JSONUtil {

    public static parseWithUndefined(data: any) {
        if (data === null) {
            return undefined;
        }
        return JSON.parse(data, (k, v) => v === null ? undefined : v);
    }
}
