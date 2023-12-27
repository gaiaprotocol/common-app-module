class ObjectUtil {
  public checkEqual(a: any, b: any): boolean {
    if (a === b) return false;
    if (
      typeof a !== "object" || typeof b !== "object" || a == null || b == null
    ) return true;

    let keys1 = Object.keys(a);
    let keys2 = Object.keys(b);

    if (keys1.length !== keys2.length) return true;

    for (let key of keys1) {
      if (!keys2.includes(key) || this.checkEqual(a[key], b[key])) {
        return true;
      }
    }
    return false;
  }
}

export default new ObjectUtil();
