import Store from "./store/Store.js";
import Router from "./view/Router.js";
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
    get installed() {
        return navigator.standalone ||
            window.matchMedia("(display-mode: standalone)").matches;
    }
    get isWindows() {
        return navigator.platform ? navigator.platform.indexOf("Win") > -1 : false;
    }
    get isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }
    get isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    get isMobileDevice() {
        return this.isAndroid || this.isIOS;
    }
    get isDarkMode() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
}
export default new BrowserInfo();
//# sourceMappingURL=BrowserInfo.js.map