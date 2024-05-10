import { v4 as uuidv4 } from "uuid";
import el from "../../dom/el.js";
import Component from "../Component.js";
export default class Checkbox extends Component {
    input;
    constructor(options = {}) {
        super(".checkbox");
        this.addAllowedEvents("check", "uncheck");
        const id = uuidv4();
        this.append(el(".checkmark-container", this.input = el("input", { id, type: "checkbox" }), el(".checkmark")), options.label ? el("label", options.label, { for: id }) : undefined);
        this.onDom("click", (event) => {
            event.stopPropagation();
            this.toggle();
        });
    }
    get checked() {
        return this.input.domElement.checked;
    }
    check() {
        if (this.checked)
            return;
        this.input.domElement.checked = true;
        this.emit("check");
    }
    uncheck() {
        if (!this.checked)
            return;
        this.input.domElement.checked = false;
        this.emit("uncheck");
    }
    toggle() {
        this.input.domElement.checked ? this.uncheck() : this.check();
    }
}
//# sourceMappingURL=Checkbox.js.map