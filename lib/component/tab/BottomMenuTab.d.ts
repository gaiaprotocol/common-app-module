import { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
export default class BottomMenuTab extends Component {
    _id: string;
    constructor(_id: string, icon: DomChild, title?: string);
    set active(b: boolean);
    get active(): boolean;
}
//# sourceMappingURL=BottomMenuTab.d.ts.map