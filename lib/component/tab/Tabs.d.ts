import { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
export default class Tabs extends Component {
    private tabs;
    private defaultTab?;
    private store;
    private ul;
    private prevButton;
    private nextButton;
    currentTab: string | undefined;
    constructor(id: string | undefined, tabs: {
        id: string;
        label: DomChild | DomChild[];
        data?: any;
    }[], defaultTab?: string | undefined);
    checkScroll(): void;
    init(id?: string): this;
    select(id: string): void;
    get data(): any;
}
//# sourceMappingURL=Tabs.d.ts.map