import { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
import BottomMenuTab from "./BottomMenuTab.js";
export default class BottomMenuTabs extends Component {
    private store;
    children: BottomMenuTab[];
    constructor(id: string | undefined, tabs: {
        id: string;
        icon: DomChild;
    }[]);
    init(id?: string): this;
    select(id: string): void;
}
//# sourceMappingURL=BottomMenuTabs.d.ts.map