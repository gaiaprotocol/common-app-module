import DomNode from "../dom/DomNode.js";
import Component from "./Component.js";

export default class NavBar extends Component {
  constructor(items: {
    [key: string]: DomNode;
  }) {
    super("nav.nav-bar");
    for (const key in items) {
      this.append(items[key]);
    }
  }
}
