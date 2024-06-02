import el from "../../dom/el.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import Input from "./Input.js";
class DynamicListInputItem extends Component {
    inputs = {};
    constructor(options, initialValue = {}) {
        super("tr.dynamic-list-item");
        this.addAllowedEvents("up", "down");
        this.append(el("td.up-down-buttons", el(".button-container", new Button({
            type: ButtonType.Circle,
            icon: new MaterialIcon("arrow_upward"),
            click: () => this.emit("up"),
        }), new Button({
            type: ButtonType.Circle,
            icon: new MaterialIcon("arrow_downward"),
            click: () => this.emit("down"),
        }))), ...options.schema.map((field) => {
            const input = new Input({
                placeholder: field.title,
                value: initialValue[field.key] || "",
                required: field.required,
            });
            this.inputs[field.key] = input;
            return el("td", input);
        }), el("td", new Button({
            type: ButtonType.Circle,
            icon: new MaterialIcon("delete"),
            click: () => this.delete(),
        })));
    }
    get data() {
        const data = {};
        for (const [key, input] of Object.entries(this.inputs)) {
            data[key] = input.value;
        }
        return data;
    }
}
export default class DynamicListInput extends Component {
    options;
    tbody;
    constructor(options, initialValues = []) {
        super(".dynamic-list-input");
        this.options = options;
        this.append(el("span.label", options.label), el("table", el("thead", el("tr", el("th.up-down-buttons"), ...options.schema.map((field) => el("th" + (field.required ? ".required" : ""), field.title)), el("th"))), this.tbody = el("tbody")), new Button({
            type: ButtonType.Outlined,
            icon: new MaterialIcon("add"),
            click: () => this.addItem(),
        }));
        for (const initialValue of initialValues) {
            this.addItem(initialValue);
        }
    }
    addItem(initialValue) {
        const item = new DynamicListInputItem(this.options, initialValue).appendTo(this.tbody);
        item.on("up", () => {
            const index = this.tbody.children.indexOf(item);
            if (index > 0) {
                item.appendTo(this.tbody, index - 1);
            }
        });
        item.on("down", () => {
            const index = this.tbody.children.indexOf(item);
            if (index < this.tbody.children.length - 1) {
                item.appendTo(this.tbody, index + 2);
            }
        });
    }
    get value() {
        return this.tbody.children.map((child) => child.data);
    }
}
//# sourceMappingURL=DynamicListInput.js.map