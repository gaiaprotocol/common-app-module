import el from "../../dom/el.js";
import Component from "../Component.js";
export default class Select extends Component {
    o;
    _value;
    _options = [];
    valueDisplay;
    optionContainer;
    constructor(o) {
        super(".select");
        this.o = o;
        this.addAllowedEvents("change");
        this.append(this.valueDisplay = el(".value"), this.optionContainer = el(".option-container"));
        if (o.placeholder) {
            this.valueDisplay.domElement.setAttribute("data-empty-message", o.placeholder);
        }
        this.onDom("mousedown", (event) => {
            event.stopPropagation();
            this.toggleClass("open");
        });
        this.onWindow("mousedown", () => this.deleteClass("open"));
        this.options = o.options;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this._value === value)
            return;
        this.valueDisplay.empty();
        const optionDom = this._options.find((option) => option.value === value)
            ?.dom.clone();
        if (optionDom)
            this.valueDisplay.append(optionDom);
        if (optionDom || value === undefined) {
            this._value = value;
            this.fireEvent("change", value);
        }
    }
    get options() {
        return this._options;
    }
    set options(options) {
        this._options = options;
        this.optionContainer.empty();
        for (const option of options) {
            option.dom.clone().appendTo(this.optionContainer).onDom("mousedown", () => this.value = option.value);
        }
        this.value = this._value;
    }
}
//# sourceMappingURL=Select.js.map