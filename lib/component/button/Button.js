import el from "../../dom/el.js";
import Component from "../Component.js";
export default class Button extends Component {
    titleContainer;
    titleText;
    constructor(options) {
        super("button" +
            (options.type !== undefined ? "." + options.type : ".contained") +
            (options.tag ?? ""));
        if (options.icon !== undefined) {
            this.append(options.icon);
        }
        if (options.title !== undefined) {
            this.append(this.titleContainer = el("span.title", this.titleText = options.title));
        }
        if (options.href !== undefined) {
            this.domElement.href = options.href;
            this.domElement.target = "_blank";
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
    set title(title) {
        if (this.titleContainer !== undefined) {
            this.titleContainer.text = title;
        }
        else {
            this.append(this.titleContainer = el("span.title", title));
        }
        this.titleText = title;
    }
    disable() {
        this.addClass("disabled");
    }
    enable() {
        this.deleteClass("disabled");
    }
}
//# sourceMappingURL=Button.js.map