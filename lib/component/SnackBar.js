import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import Component from "./Component.js";
import MaterialIcon from "./MaterialIcon.js";
import Button from "./button/Button.js";
import ButtonType from "./button/ButtonType.js";
export default class Snackbar extends Component {
    constructor(options) {
        super(".snackbar");
        this.append(el("main", el("p", options.message), options.action
            ? new Button({
                tag: ".action",
                type: ButtonType.Text,
                title: options.action.title,
                click: () => {
                    options.action?.click();
                    this.delete();
                },
            })
            : undefined, el("button.close", new MaterialIcon("close"), {
            click: () => this.delete(),
        })));
        BodyNode.append(this);
        setTimeout(() => this.delete(), 5000);
    }
}
//# sourceMappingURL=SnackBar.js.map