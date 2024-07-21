import el from "../../dom/el.js";
import Component from "../Component.js";

export default class Switch extends Component {
  constructor(value?: boolean) {
    super("label.switch");
    this.addAllowedEvents("change");
    this.append(
      el("input", {
        type: "checkbox",
        checked: value ? "checked" : undefined,
        change: (event: Event) =>
          this.emit("change", (event.target as HTMLInputElement).checked),
      }),
      el("span.slider"),
    );
  }
}
