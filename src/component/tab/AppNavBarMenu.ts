import DomNode, { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";

export default class AppNavBarMenu extends Component {
  constructor(
    public options: {
      id: string;
      icon: DomNode;
      activeIcon?: DomNode;
      title: string;
    },
  ) {
    super("li.app-nav-bar-menu");
    this.append(options.icon.clone(), options.title);
  }

  public set active(b: boolean) {
    b ? this.addClass("active") : this.deleteClass("active");
    if (this.options.activeIcon) {
      this.empty().append(
        b ? this.options.activeIcon.clone() : this.options.icon.clone(),
        this.options.title,
      );
    }
  }

  public get active() {
    return this.hasClass("active");
  }
}
