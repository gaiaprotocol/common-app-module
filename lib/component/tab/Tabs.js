import el from "../../dom/el.js";
import Store from "../../store/Store.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import Tab from "./Tab.js";
export default class Tabs extends Component {
    tabs;
    defaultTab;
    store;
    ul;
    prevButton;
    nextButton;
    currentTab;
    constructor(id, tabs, defaultTab) {
        super(".tabs");
        this.tabs = tabs;
        this.defaultTab = defaultTab;
        this.addAllowedEvents("select");
        if (id)
            this.store = new Store(`tabs-${id}`);
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
                }
                else {
                    this.ul.domElement.scrollBy(scrollAmount, 0);
                }
            },
        }).appendTo(this);
        this.ul = el("ul").appendTo(this);
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
                    this.ul.domElement.scrollBy(maxScrollPosition - currentScrollPosition, 0);
                }
                else {
                    this.ul.domElement.scrollBy(scrollAmount, 0);
                }
            },
        }).appendTo(this);
        this.on("visible", () => {
            setTimeout(() => {
                if (!this.deleted)
                    this.checkScroll();
            });
        });
        this.ul.onDom("scroll", () => this.checkScroll());
        this.onWindow("resize", () => this.checkScroll());
        this.ul.onDom("wheel", (e) => {
            if (!e.shiftKey) {
                e.preventDefault();
                this.ul.domElement.scrollLeft += e.deltaX + e.deltaY;
            }
        });
    }
    checkScroll() {
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
        }
        else {
            this.deleteClass("scrollable");
        }
    }
    init(id) {
        if (id) {
            this.select(id);
        }
        else if (this.store?.get("selected")) {
            this.select(this.store.get("selected"));
        }
        else if (this.defaultTab) {
            this.select(this.defaultTab);
        }
        else {
            const firstId = this.ul.children[0]?._id;
            if (firstId)
                this.select(firstId);
        }
        return this;
    }
    select(id) {
        let found = false;
        for (const tab of this.ul.children) {
            if (tab._id === id) {
                tab.active = true;
                found = true;
            }
            else if (tab.active) {
                tab.active = false;
            }
        }
        if (found) {
            this.store?.set("selected", id, true);
            this.currentTab = id;
            this.emit("select", id);
        }
        else {
            const firstId = this.ul.children[0]?._id;
            if (firstId)
                this.select(firstId);
        }
    }
    get data() {
        return this.tabs.find((t) => t.id === this.currentTab)?.data;
    }
}
//# sourceMappingURL=Tabs.js.map