import BrowserInfo from "../BrowserInfo.js";
import EventContainer from "../event/EventContainer.js";
import Store from "../store/Store.js";
import Theme from "./Theme.js";
class ThemeManager extends EventContainer {
    store = new Store("__THEME_MANAGER_STORE");
    constructor() {
        super();
        this.addAllowedEvents("change");
    }
    init() {
        this.theme = this.theme;
    }
    get theme() {
        const theme = this.store.get("theme");
        return theme === undefined ? Theme.Auto : theme;
    }
    set theme(theme) {
        this.store.set("theme", theme);
        document.documentElement.setAttribute("data-theme", this.showingTheme);
        this.fireEvent("change");
    }
    get showingTheme() {
        const theme = this.theme;
        return theme === Theme.Auto
            ? (BrowserInfo.isDarkMode === true ? Theme.Dark : Theme.Light)
            : theme;
    }
}
export default new ThemeManager();
//# sourceMappingURL=ThemeManager.js.map