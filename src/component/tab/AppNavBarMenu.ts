import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";

export default class AppNavBarMenu extends Component {
  constructor(
    public options: {
      id: string;
      icon: DomNode;
      activeIcon?: DomNode;
      title: string;
      toFooter?: boolean;
    },
  ) {
    super("li.app-nav-bar-menu" + (options.toFooter ? ".to-footer" : ""));
    this.append(options.icon.clone(), el("span.title", options.title));
  }

  public set active(b: boolean) {
    b ? this.addClass("active") : this.deleteClass("active");
    if (this.options.activeIcon) {
      this.empty().append(
        b ? this.options.activeIcon.clone() : this.options.icon.clone(),
        el("span.title", this.options.title),
      );
    }
  }

  public get active() {
    return this.hasClass("active");
  }
}
