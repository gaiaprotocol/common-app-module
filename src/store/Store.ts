import JSONUtil from "../util/JSONUtil.js";

export default class Store {
  constructor(private name: string) {}

  private selectStorage(permanently: boolean): Storage {
    return permanently ? localStorage : sessionStorage;
  }

  private getKey(key: string): string {
    return `${this.name}/${key}`;
  }

  public set(key: string, value: any, permanently: boolean = false) {
    this.selectStorage(permanently).setItem(
      this.getKey(key),
      JSON.stringify(value),
    );
    this.selectStorage(!permanently).removeItem(this.getKey(key));
  }

  public get<T>(key: string, defaultValue?: T): T | undefined {
    let value = sessionStorage.getItem(this.getKey(key)) ||
      localStorage.getItem(this.getKey(key));

    if (value === null) {
      return defaultValue;
    }
    return JSONUtil.parseWithUndefined(value);
  }

  public checkPermanently(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  public delete(key: string) {
    sessionStorage.removeItem(this.getKey(key));
    localStorage.removeItem(this.getKey(key));
  }
}
