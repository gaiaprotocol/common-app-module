import el from "../../dom/el.js";
import Component from "../Component.js";
import LoadingSpinner from "../LoadingSpinner.js";
export default class Button extends Component {
    options;
    _icon;
    titleContainer;
    constructor(options) {
        super("button" +
            (options.type !== undefined ? "." + options.type : ".text") +
            (options.tag ?? ""));
        this.options = options;
        if (options.icon !== undefined) {
            this.append(this._icon = options.icon.clone());
        }
        if (options.title !== undefined) {
            this.append(this.titleContainer = el("span.title", options.title));
        }
        if (options.href !== undefined) {
            this.onDom("click", () => {
                if (options.target === "_blank") {
                    window.open(options.href);
                }
                else {
                    window.location.href = options.href;
                }
            });
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
    set icon(icon) {
        this._icon?.delete();
        this._icon = icon.appendTo(this, 0);
    }
    disable() {
        this.domElement.setAttribute("disabled", "disabled");
        this.addClass("disabled");
        return this;
    }
    enable() {
        this.domElement.removeAttribute("disabled");
        this.deleteClass("disabled");
        return this;
    }
    set loading(loading) {
        if (loading) {
            this.disable();
            this.addClass("loading");
            if (this.options.icon)
                this.icon = new LoadingSpinner();
            else
                this.title = new LoadingSpinner();
        }
        else {
            this.enable();
            this.deleteClass("loading");
            if (this.options.icon)
                this.icon = this.options.icon.clone();
            else
                this.title = this.options.title ?? "";
        }
    }
}
//# sourceMappingURL=Button.js.map