import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";

export default class AppNavBarMenu extends Component {
  public icon: DomNode;

  constructor(
    public options: {
      id: string;
      icon: DomNode;
      activeIcon?: DomNode;
      title?: string;
      toFooter?: boolean;
    },
  ) {
    super(
      "li.app-nav-bar-menu" + (options.toFooter ? ".to-footer" : "") + "." +
        options.id,
    );
    this.append(
      this.icon = options.icon.clone(),
      options.title ? el("span.title", options.title) : undefined,
    );
  }

  public set active(b: boolean) {
    b ? this.addClass("active") : this.deleteClass("active");
    if (this.options.activeIcon) {
      this.empty().append(
        this.icon = b
          ? this.options.activeIcon.clone()
          : this.options.icon.clone(),
        this.options.title ? el("span.title", this.options.title) : undefined,
      );
    }
  }

  public get active() {
    return this.hasClass("active");
  }
}
