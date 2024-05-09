import Button from "../component/button/Button.js";
import Popup from "../component/exitable/Popup.js";
import el from "../dom/el.js";
import msg from "../i18n/msg.js";
export default class ExitAndroidAppPopup extends Popup {
    constructor() {
        super(".exit-android-app-popup", {
            barrierDismissible: true,
            ignoreExitableHash: true,
        });
        this.header.append(el("h1", msg("exit-android-app-popup-title")));
        this.main.append(el("p", msg("exit-android-app-popup-message")));
        this.footer.append(new Button({
            tag: ".cancel",
            title: msg("cancel-button"),
            click: () => this.delete(),
        }));
    }
}
//# sourceMappingURL=ExitAndroidAppPopup.js.map