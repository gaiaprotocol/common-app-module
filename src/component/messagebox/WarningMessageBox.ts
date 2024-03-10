import { DomChild } from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";

export default class WarningMessageBox extends Component {
  constructor(options: { tag?: string; message: DomChild | DomChild[] }) {
    super((options.tag ?? "") + ".message-box.warning-message-box");
    this.append(
      new MaterialIcon("warning"),
      el(
        "p",
        ...(Array.isArray(options.message)
          ? options.message
          : [options.message]),
      ),
    );
  }
}
