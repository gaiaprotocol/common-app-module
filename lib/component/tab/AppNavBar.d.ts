import DomNode, { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
export default class AppNavBar extends Component {
    private store;
    private ul;
    constructor(options: {
        id: string;
        logo: DomChild;
        menu: {
            id: string;
            icon: DomNode;
            activeIcon?: DomNode;
            title: string;
            toFooter?: boolean;
        }[];
    });
    init(id?: string): this;
    select(id: string): void;
}
//# sourceMappingURL=AppNavBar.d.ts.map