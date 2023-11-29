import DomNode, { DomChild } from "../dom/DomNode.js";
import el from "../dom/el.js";
import Router from "../view/Router.js";
import Component from "./Component.js";

export default class NavBar extends Component {
  private activatedButton: DomNode | undefined;

  constructor(options: {
    logo?: DomChild;
    menu: { title: DomChild; uri: string }[];
  }) {
    super(".nav-bar");

    this.append(
      options.logo
        ? el("a.logo", options.logo, {
          href: "/",
          click: (event) => {
            event.preventDefault();
            Router.go("/");
          },
        })
        : undefined,
      ...options.menu.map((item) =>
        el("a", item.title, {
          href: item.uri,
          click: (event) => {
            event.preventDefault();
            Router.go(item.uri);
          },
        })
      ),
    );
  }

  public activeButton(buttonName: string) {
    this.activatedButton?.deleteClass("active");
    this.activatedButton = this.children.find((child) =>
      child.hasClass(buttonName)
    )?.addClass("active");
  }
}
