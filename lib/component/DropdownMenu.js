import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import Component from "./Component.js";
export default class DropdownMenu extends Component {
    ul;
    constructor(options) {
        super(".dropdown-menu" + (options.tag ?? ""));
        this.append(this.ul = el("ul"), options.footer);
        for (const item of options.items) {
            this.ul.append(el("li", el("button", item.icon, item.title, {
                click: (event) => {
                    event.stopPropagation();
                    item.click();
                    this.delete();
                },
            })));
        }
        this.style({ left: options.left, top: options.top });
        BodyNode.append(this);
        window.addEventListener("click", this.windowClickHandler);
    }
    windowClickHandler = (event) => {
        if (!this.domElement.contains(event.target)) {
            this.delete();
        }
    };
    delete() {
        window.removeEventListener("click", this.windowClickHandler);
        super.delete();
    }
}
//# sourceMappingURL=DropdownMenu.js.map