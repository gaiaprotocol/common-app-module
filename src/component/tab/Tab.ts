import { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";

export default class Tab extends Component {
  constructor(public _id: string, label: DomChild | DomChild[]) {
    super("li.tab");
    this.append(...(Array.isArray(label) ? label : [label]));
  }

  public set active(b: boolean) {
    b ? this.addClass("active") : this.deleteClass("active");
  }
}
