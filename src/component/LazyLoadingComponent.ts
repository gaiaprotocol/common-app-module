import DomNode from "../dom/DomNode.js";
import Component from "./Component.js";

export default abstract class LazyLoadingComponent<
  EL extends HTMLElement = HTMLElement,
  CT extends DomNode = DomNode,
> extends Component<EL, CT> {
  public loaded = false;

  constructor(tag: string) {
    super(tag + ".lazy-loading-component");
    this.addClass("hidden");
  }

  protected abstract load(): void;

  public show() {
    this.deleteClass("hidden");
    if (!this.loaded) {
      this.load();
      this.loaded = true;
    }
  }

  public hide() {
    this.addClass("hidden");
  }
}
