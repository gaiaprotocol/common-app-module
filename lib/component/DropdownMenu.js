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
            if (rect.left < 8)
                this.style({ left: 8 });
            else if (rect.left + rect.width > window.innerWidth - 8) {
                this.style({ left: window.innerWidth - rect.width - 8 });
            }
            if (rect.top < 8)
                this.style({ top: 8 });
            else if (rect.top + rect.height > window.innerHeight - 8) {
                this.style({ top: window.innerHeight - rect.height - 8 });
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