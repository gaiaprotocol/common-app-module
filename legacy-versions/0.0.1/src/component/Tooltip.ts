import Component from "./Component.js";

export default class Tooltip extends Component {
  constructor(message: string) {
    super(".tooltip", message);
  }

  public show(left: number, top: number) {
    this.style({ left: left - this.rect.width / 2, top: top + 8 });
  }

  public hide() {
    this.style({ left: -999999, top: -999999 });
  }
}
