import el from "../dom/el.js";
import Component from "./Component.js";
import MaterialIcon from "./MaterialIcon.js";
import Button from "./button/Button.js";
export default class Snackbar extends Component {
    constructor(options) {
        super(".snackbar");
        this.append(el("p", options.message), options.action
            ? new Button({
                title: options.action.title,
                click: () => {
                    options.action?.click();
                    this.delete();
                },
            })
            : undefined, el("button", new MaterialIcon("close"), {
            click: () => this.delete(),
        }));
        setTimeout(() => this.delete(), 2750);
    }
}
//# sourceMappingURL=SnackBar.js.map