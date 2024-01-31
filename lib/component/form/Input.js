import el from "../../dom/el.js";
import Component from "../Component.js";
export default class Input extends Component {
    input;
    previousValue = "";
    constructor(options) {
        super("label.input" + (options.disabled === true ? ".disabled" : "") +
            (options.required === true ? ".required" : "") +
            (options.tag ?? ""));
        this.addAllowedEvents("change");
        this.append(options.label, this.input = el(options.multiline === true ? "textarea" : "input", {
            placeholder: options.placeholder,
            disabled: options.disabled === true ? "disabled" : undefined,
            keyup: () => {
                if (this.value !== this.previousValue) {
                    this.fireEvent("change");
                    this.previousValue = this.value;
                }
            },
        }));
        if (options.value !== undefined) {
            this.value = options.value;
        }
    }
    get value() {
        return this.input.domElement.value;
    }
    set value(value) {
        if (this.input.domElement.value === value)
            return;
        this.input.domElement.value = value;
        this.fireEvent("change");
    }
    select() {
        this.input.domElement.select();
    }
}
//# sourceMappingURL=Input.js.map