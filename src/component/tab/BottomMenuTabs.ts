import { DomChild } from "../../dom/DomNode.js";
import Store from "../../store/Store.js";
import Component from "../Component.js";
import BottomMenuTab from "./BottomMenuTab.js";

export default class BottomMenuTabs extends Component {
  private store: Store | undefined;

  public children: BottomMenuTab[] = [];

  constructor(
    id: string | undefined,
    tabs: { id: string; icon: DomChild }[],
  ) {
    super("ul.bottom-menu-tabs");
    this.addAllowedEvents("select");

    if (id) this.store = new Store(`bottom-menu-tabs-${id}`);

    for (const t of tabs) {
      const tab = new BottomMenuTab(t.id, t.icon);
      tab.onDom("click", () => this.select(t.id));
      this.append(tab);
    }
  }

  public init(id?: string) {
    if (id) {
      this.select(id);
    } else if (this.store?.get("selected")) {
      this.select(this.store.get("selected")!);
    } else {
      const firstId = this.children[0]?._id;
      if (firstId) {
        this.select(firstId);
      }
    }
    return this;
  }

  public select(id: string) {
    let found = false;

    for (const tab of this.children) {
      if (tab._id === id) {
        tab.active = true;
        found = true;
      } else if (tab.active) {
        tab.active = false;
      }
    }

    if (found) {
      this.store?.set("selected", id, true);
      this.emit("select", id);
    } else {
      const firstId = this.children[0]?._id;
      if (firstId) {
        this.select(firstId);
      }
    }
  }
}
