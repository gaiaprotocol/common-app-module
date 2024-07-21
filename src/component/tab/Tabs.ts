import DomNode, { DomChild } from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Store from "../../store/Store.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import Tab from "./Tab.js";

export default class Tabs extends Component {
  private store: Store | undefined;
  private ul: DomNode<HTMLElement, Tab>;
  private prevButton: Button;
  private nextButton: Button;

  public currentTab: string | undefined;

  constructor(
    id: string | undefined,
    private tabs: { id: string; label: DomChild | DomChild[]; data?: any }[],
    private defaultTab?: string,
  ) {
    super(".tabs");
    this.addAllowedEvents("select");
    if (id) this.store = new Store(`tabs-${id}`);

    this.prevButton = new Button({
      tag: ".prev",
      type: ButtonType.Circle,
      icon: new MaterialIcon("arrow_back_ios_new"),
      onClick: () => {
        const maxScrollLeft = 0;
        const currentScrollPosition = this.ul.domElement.scrollLeft;
        const scrollAmount = -this.ul.domElement.clientWidth;
        if (currentScrollPosition + scrollAmount < maxScrollLeft) {
          this.ul.domElement.scrollBy(maxScrollLeft - currentScrollPosition, 0);
        } else {
          this.ul.domElement.scrollBy(scrollAmount, 0);
        }
      },
    }).appendTo(this);

    this.ul = el<HTMLElement, Tab>("ul").appendTo(this);
    for (const t of tabs) {
      const tab = new Tab(t.id, t.label);
      tab.onDom("click", () => this.select(t.id));
      this.ul.append(tab);
    }

    this.nextButton = new Button({
      tag: ".next",
      type: ButtonType.Circle,
      icon: new MaterialIcon("arrow_forward_ios"),
      onClick: () => {
        const currentScrollPosition = this.ul.domElement.scrollLeft;
        const scrollAmount = this.ul.domElement.clientWidth;
        const maxScrollPosition = this.ul.domElement.scrollWidth -
          this.ul.domElement.clientWidth;
        if (currentScrollPosition + scrollAmount > maxScrollPosition) {
          this.ul.domElement.scrollBy(
            maxScrollPosition - currentScrollPosition,
            0,
          );
        } else {
          this.ul.domElement.scrollBy(scrollAmount, 0);
        }
      },
    }).appendTo(this);

    this.on("visible", () => {
      setTimeout(() => {
        if (!this.deleted) this.checkScroll();
      });
    });
    this.ul.onDom("scroll", () => this.checkScroll());
    this.onWindow("resize", () => this.checkScroll());

    this.ul.onDom("wheel", (e: WheelEvent) => {
      if (!e.shiftKey) {
        e.preventDefault();
        this.ul.domElement.scrollLeft += e.deltaX + e.deltaY;
      }
    });
  }

  public checkScroll() {
    const dom = this.ul.domElement;
    const hasHorizontalScroll = dom.scrollWidth > dom.clientWidth;
    if (hasHorizontalScroll) {
      this.addClass("scrollable");
      dom.scrollLeft === 0
        ? this.prevButton.disable()
        : this.prevButton.enable();
      dom.scrollWidth - dom.clientWidth <= dom.scrollLeft + 1
        ? this.nextButton.disable()
        : this.nextButton.enable();
    } else {
      this.deleteClass("scrollable");
    }
  }

  public init(id?: string) {
    if (id) {
      this.select(id);
    } else if (this.store?.get("selected")) {
      this.select(this.store.get("selected")!);
    } else if (this.defaultTab) {
      this.select(this.defaultTab);
    } else {
      const firstId = this.ul.children[0]?._id;
      if (firstId) this.select(firstId);
    }
    return this;
  }

  public select(id: string) {
    let found = false;

    for (const tab of this.ul.children) {
      if (tab._id === id) {
        tab.active = true;
        found = true;
      } else if (tab.active) {
        tab.active = false;
      }
    }

    if (found) {
      this.store?.set("selected", id, true);
      this.currentTab = id;
      this.emit("select", id);
    } else {
      const firstId = this.ul.children[0]?._id;
      if (firstId) this.select(firstId);
    }
  }

  public get data() {
    return this.tabs.find((t) => t.id === this.currentTab)?.data;
  }
}
