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
        this.on("visible", () => {
            const rect = this.rect;
            if (rect.left + rect.width > window.innerWidth) {
                this.style({ left: window.innerWidth - rect.width });
            }
            if (rect.top + rect.height > window.innerHeight) {
                this.style({ top: window.innerHeight - rect.height });
            }
        });
        window.getSelection()?.empty();
        for (const node of BodyNode.children) {
            if (node instanceof DropdownMenu)
                node.delete();
        }
        BodyNode.append(this);
        this.onWindow("click", (event) => {
            if (!this.domElement.contains(event.target)) {
                this.delete();
            }
        });
        this.onWindow("touchstart", (event) => {
            if (!this.domElement.contains(event.target)) {
                this.delete();
            }
        });
        this.onWindow("keydown", (event) => {
            if (event.key === "Escape")
                this.delete();
        });
    }
}
//# sourceMappingURL=DropdownMenu.js.map