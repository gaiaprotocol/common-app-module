import el from "../../dom/el.js";
import Component from "../Component.js";
import Icon from "../Icon.js";
export default class WarningMessageBox extends Component {
    constructor(options) {
        super((options.tag ?? "") + ".message-box.warning-message-box");
        this.append(new Icon("warning"), el("p", ...(Array.isArray(options.message)
            ? options.message
            : [options.message])));
    }
}
//# sourceMappingURL=WarningMessageBox.js.map