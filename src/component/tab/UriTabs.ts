import { DomChild } from "../../dom/DomNode.js";
import Router from "../../view/Router.js";
import Component from "../Component.js";
import Tab from "./Tab.js";

export default class UriTabs extends Component {
  public children: Tab[] = [];

  constructor(tabs: { uri: string; label: DomChild | DomChild[] }[]) {
    super("ul.tabs");
    for (const t of tabs) {
      const tab = new Tab(t.uri, t.label);
      tab.onDom("click", () => Router.go(`/${t.uri}`));
      this.append(tab);
    }
  }

  public active(uri: string) {
    for (const tab of this.children) {
      if (tab._id === uri) {
        tab.active = true;
      } else {
        tab.active = false;
      }
    }
  }
}
