import Component from "./Component.js";

export default abstract class LazyLoadingComponent extends Component {
  private loaded = false;

  constructor(tag: string) {
    super(".lazy-loading-component" + tag);
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
