import { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";

export default class BottomMenuTab extends Component {
  constructor(public _id: string, icon: DomChild) {
    super("li.tab");
    this.append(icon);
  }

  public set active(b: boolean) {
    b ? this.addClass("active") : this.deleteClass("active");
  }

  public get active() {
    return this.hasClass("active");
  }
}
