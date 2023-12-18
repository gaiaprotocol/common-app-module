import el from "../../dom/el.js";
import Component from "../Component.js";
export default class Button extends Component {
    titleContainer;
    constructor(options) {
        super("button" +
            (options.type !== undefined ? "." + options.type : ".contained") +
            (options.tag ?? ""));
        if (options.icon !== undefined) {
            this.append(options.icon);
        }
        if (options.title !== undefined) {
            this.append(this.titleContainer = el("span.title", options.title));
        }
        if (options.href !== undefined) {
            this.onDom("click", () => window.open(options.href));
        }
        if (options.disabled === true) {
            this.disable();
        }
        if (options.click !== undefined) {
            this.onDom("click", (event) => {
                if (this.hasClass("disabled") !== true) {
                    options.click(event, this);
                }
            });
        }
    }
    set type(type) {
        this.deleteClass("contained", "outlined", "text");
        this.addClass(type);
    }
    set title(title) {
        if (this.titleContainer !== undefined) {
            this.titleContainer.empty().append(title);
        }
        else {
            this.append(this.titleContainer = el("span.title", title));
        }
    }
    disable() {
        this.addClass("disabled");
        return this;
    }
    enable() {
        this.deleteClass("disabled");
        return this;
    }
}
//# sourceMappingURL=Button.js.map