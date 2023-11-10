import Store from "../store/Store.js";
import Router from "../view/Router.js";
class BrowserInfo {
    store = new Store("__BROWSER_INFO_STORE");
    normalizeLanguage(language) {
        if (language.indexOf("-") !== -1 &&
            language !== "zh-TW" &&
            language !== "zh-HK") {
            language = language.substring(0, language.indexOf("-"));
        }
        return language;
    }
    get language() {
        let language = this.store.get("lang") ||
            navigator.language;
        return this.normalizeLanguage(language);
    }
    set language(language) {
        this.store.set("lang", this.normalizeLanguage(language));
    }
    changeLanguage(language) {
        if (!language) {
            throw new Error("Invalid language code.");
        }
        this.language = language;
        Router.refresh();
    }
    get isPhoneSize() {
        return window.innerWidth <= 859;
    }
}
export default new BrowserInfo();
//# sourceMappingURL=BrowserInfo.js.map