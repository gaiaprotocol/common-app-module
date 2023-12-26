import { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
export default class Tab extends Component {
    _id: string;
    constructor(_id: string, label: DomChild | DomChild[]);
    set active(b: boolean);
    get active(): boolean;
}
//# sourceMappingURL=Tab.d.ts.map