import DomNode from "../../dom/DomNode.js";
import Tab from "./Tab.js";

export default class Tabs extends DomNode {
  public children: Tab[] = [];

  constructor(id: string, tabs: { id: string; label: string }[]) {
    super("ul.tabs");
    this.addAllowedEvents("select");

    for (const t of tabs) {
      const tab = new Tab(t.id, t.label);
      tab.onDom("click", () => this.select(t.id));
      this.append(tab);
    }
  }

  public init() {
    //TODO:
    const firstId = this.children[0]?._id;
    if (firstId) {
      this.select(firstId);
    }
  }

  public select(id: string) {
    for (const tab of this.children) {
      tab.active = tab._id === id;
    }
    this.fireEvent("select", id);
  }
}
