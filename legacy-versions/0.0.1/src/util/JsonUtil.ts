class JsonUtil {
  public parseWithUndefined(data: any) {
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data, (k, v) => v === null ? undefined : v);
  }
}

export default new JsonUtil();
