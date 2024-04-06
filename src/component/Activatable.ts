import Component from "./Component.js";

export default abstract class Activatable extends Component {
  constructor(tag: string) {
    super(tag + ".activatable");
  }

  public activate(): void {
    this.addClass("active");
  }

  public deactivate(): void {
    this.deleteClass("active");
  }
}
