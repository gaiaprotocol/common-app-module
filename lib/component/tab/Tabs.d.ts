import { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
export default class Tabs extends Component {
    private store;
    private ul;
    private prevButton;
    private nextButton;
    constructor(id: string | undefined, tabs: {
        id: string;
        label: DomChild | DomChild[];
    }[]);
    private checkScroll;
    init(id?: string): this;
    select(id: string): void;
}
//# sourceMappingURL=Tabs.d.ts.map