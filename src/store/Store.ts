import JsonUtil from "../util/JsonUtil.js";

export default class Store {
  constructor(private name: string) {}

  private selectStorage(permanently: boolean): Storage {
    return permanently ? localStorage : sessionStorage;
  }

  private getKey(key: string): string {
    return `${this.name}/${key}`;
  }

  public set(key: string, value: any, permanently: boolean = false) {
    this.selectStorage(!permanently).removeItem(this.getKey(key));
    const storage = this.selectStorage(permanently);
    try {
      storage.setItem(this.getKey(key), JSON.stringify(value));
    } catch (e) {
      if (
        e instanceof DOMException && (
          e.code === 22 ||
          e.code === 1014 ||
          e.name === "QuotaExceededError" ||
          e.name === "NS_ERROR_DOM_QUOTA_REACHED"
        )
      ) {
        storage.clear();
        location.reload();
      } else {
        throw e;
      }
    }
  }

  public get<T>(key: string, defaultValue?: T): T | undefined {
    let value = sessionStorage.getItem(this.getKey(key)) ||
      localStorage.getItem(this.getKey(key));

    if (value === null) {
      return defaultValue;
    }
    try {
      return JsonUtil.parseWithUndefined(value);
    } catch (e) {
      console.error(`Failed to parse ${this.getKey(key)}: ${value}`);
      console.error(e);
      return defaultValue;
    }
  }

  public getAll<T>(): { [key: string]: T } {
    const result: { [key: string]: T } = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(this.name)) {
        result[key.substring(this.name.length + 1)] = JsonUtil
          .parseWithUndefined(sessionStorage.getItem(key));
      }
    }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.name)) {
        result[key.substring(this.name.length + 1)] = JsonUtil
          .parseWithUndefined(localStorage.getItem(key));
      }
    }
    return result;
  }

  public checkPermanently(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  public delete(...keys: string[]) {
    for (const key of keys) {
      sessionStorage.removeItem(this.getKey(key));
      localStorage.removeItem(this.getKey(key));
    }
  }

  public clear() {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(this.name)) {
        sessionStorage.removeItem(key);
      }
    }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.name)) {
        localStorage.removeItem(key);
      }
    }
  }
}
