import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import Component from "./Component.js";

export default class DropdownMenu extends Component {
  constructor(options: {
    left: number;
    top: number;
    items: {
      title: string;
      click: () => void;
    }[];
  }) {
    super("ul.dropdown-menu");
    for (const item of options.items) {
      this.append(el(
        "li",
        el("button", item.title, {
          click: (event) => {
            event.stopPropagation();
            item.click();
            this.delete();
          },
        }),
      ));
    }
    this.style({ left: options.left, top: options.top });
    BodyNode.append(this);
    window.addEventListener("click", this.windowClickHandler);
  }

  private windowClickHandler = (event: MouseEvent) => {
    if (!this.domElement.contains(event.target as Node)) {
      this.delete();
    }
  };

  public delete() {
    window.removeEventListener("click", this.windowClickHandler);
    super.delete();
  }
}
