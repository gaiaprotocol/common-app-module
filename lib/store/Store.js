import JsonUtil from "../util/JsonUtil.js";
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
        this.selectStorage(!permanently).removeItem(this.getKey(key));
        const storage = this.selectStorage(permanently);
        try {
            storage.setItem(this.getKey(key), JSON.stringify(value));
        }
        catch (e) {
            if (e instanceof DOMException && (e.code === 22 ||
                e.code === 1014 ||
                e.name === "QuotaExceededError" ||
                e.name === "NS_ERROR_DOM_QUOTA_REACHED")) {
                storage.clear();
                location.reload();
            }
            else {
                throw e;
            }
        }
    }
    get(key, defaultValue) {
        let value = sessionStorage.getItem(this.getKey(key)) ||
            localStorage.getItem(this.getKey(key));
        if (value === null) {
            return defaultValue;
        }
        try {
            return JsonUtil.parseWithUndefined(value);
        }
        catch (e) {
            console.error(`Failed to parse ${this.getKey(key)}: ${value}`);
            console.error(e);
            return defaultValue;
        }
    }
    getAll() {
        const result = {};
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
    checkPermanently(key) {
        return localStorage.getItem(this.getKey(key)) !== null;
    }
    delete(key) {
        sessionStorage.removeItem(this.getKey(key));
        localStorage.removeItem(this.getKey(key));
    }
    clear() {
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
//# sourceMappingURL=Store.js.map