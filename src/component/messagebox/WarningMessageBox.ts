import el from "../../dom/el.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";

export default class WarningMessageBox extends Component {
  constructor(options: { tag?: string; message: string }) {
    super((options.tag ?? "") + ".message-box.warning-message-box");
    this.append(
      new MaterialIcon("warning"),
      el("p", options.message),
    );
  }
}
