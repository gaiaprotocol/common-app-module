import JSONUtil from "../util/JSONUtil.js";
export default class Store {
    name;
    constructor(name) {
        this.name = name;
    }
    selectStorage(permanently) {
        return permanently ? localStorage : sessionStorage;
    }
    getKey(key) {
        return `${this.name}/${key}`;
    }
    set(key, value, permanently = false) {
        this.selectStorage(permanently).setItem(this.getKey(key), JSON.stringify(value));
        this.selectStorage(!permanently).removeItem(this.getKey(key));
    }
    get(key, defaultValue) {
        let value = sessionStorage.getItem(this.getKey(key)) ||
            localStorage.getItem(this.getKey(key));
        if (value === null) {
            return defaultValue;
        }
        return JSONUtil.parseWithUndefined(value);
    }
    checkPermanently(key) {
        return localStorage.getItem(this.getKey(key)) !== null;
    }
    delete(key) {
        sessionStorage.removeItem(this.getKey(key));
        localStorage.removeItem(this.getKey(key));
    }
}
//# sourceMappingURL=Store.js.map