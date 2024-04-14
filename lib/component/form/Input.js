import el from "../../dom/el.js";
import Component from "../Component.js";
export default class Input extends Component {
    input;
    previousValue = "";
    constructor(options) {
        super("label.input" + (options.disabled === true ? ".disabled" : "") +
            (options.required === true ? ".required" : "") +
            (options.tag ?? ""));
        this.addAllowedEvents("change", "enter");
        this.append(el("span.label", options.label), this.input = el(options.multiline === true ? "textarea" : "input", {
            type: options.type,
            placeholder: options.placeholder,
            disabled: options.disabled === true ? "disabled" : undefined,
            required: options.required === true ? "required" : undefined,
            readonly: options.readonly === true ? "readonly" : undefined,
            keydown: (event) => {
                if (event.key === "Enter") {
                    this.fireEvent("enter");
                }
            },
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