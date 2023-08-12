import { v4 as uuidv4 } from "uuid";
import el from "../dom/el.js";
import Component from "./Component.js";
export default class Checkbox extends Component {
    constructor(options) {
        super(".checkbox");
        const id = uuidv4();
        this.append(el("input", { id, type: "checkbox" }), el("label", { for: id }, options.label));
    }
}
//# sourceMappingURL=Checkbox.js.map