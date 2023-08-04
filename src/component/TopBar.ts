import DomNode from "../dom/DomNode.js";
import el from "../dom/el.js";
import Router from "../view/Router.js";
import Component from "./Component.js";

export default class TopBar extends Component {
  constructor(options: {
    logo: DomNode;
  }) {
    super(".topbar");

    this.append(
      el(
        ".container",
        el("a.logo", options.logo, {
          href: "/",
          click: (event) => {
            event.preventDefault();
            Router.go("/");
          },
        }),
      ),
    );
  }
}
