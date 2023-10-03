import DomNode from "../../dom/DomNode.js";
import Tab from "./Tab.js";
export default class Tabs extends DomNode {
    children: Tab[];
    constructor(id: string, tabs: {
        id: string;
        label: string;
    }[]);
    init(): void;
    select(id: string): void;
}
//# sourceMappingURL=Tabs.d.ts.map