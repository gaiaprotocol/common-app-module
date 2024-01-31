import { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
import Tab from "./Tab.js";
export default class Tabs extends Component {
    children: Tab[];
    private store;
    constructor(id: string, tabs: {
        id: string;
        label: DomChild | DomChild[];
    }[]);
    init(id?: string): this;
    select(id: string): void;
}
//# sourceMappingURL=Tabs.d.ts.map