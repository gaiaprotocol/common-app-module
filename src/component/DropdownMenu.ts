import BodyNode from "../dom/BodyNode.js";
import DomNode from "../dom/DomNode.js";
import el from "../dom/el.js";
import Component from "./Component.js";

export default class DropdownMenu extends Component {
  private ul: DomNode;

  constructor(options: {
    tag?: string;
    left: number;
    top: number;
    items: {
      icon?: DomNode;
      title: string;
      click: () => void;
    }[];
    footer?: DomNode;
  }) {
    super(".dropdown-menu" + (options.tag ?? ""));

    this.append(
      this.ul = el("ul"),
      options.footer,
    );

    for (const item of options.items) {
      this.ul.append(el(
        "li",
        el("button", item.icon, item.title, {
          click: (event) => {
            event.stopPropagation();
            item.click();
            this.delete();
          },
        }),
      ));
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

    BodyNode.append(this);

    this.onWindow("click", (event: MouseEvent) => {
      if (!this.domElement.contains(event.target as Node)) {
        this.delete();
      }
    });

    this.onWindow("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") this.delete();
    });
  }
}
