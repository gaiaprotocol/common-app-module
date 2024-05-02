import DomNode from "../../dom/DomNode.js";
import Component from "../Component.js";
export default class AppNavBarMenu extends Component {
    options: {
        id: string;
        icon: DomNode;
        activeIcon?: DomNode;
        title?: string;
        toFooter?: boolean;
    };
    icon: DomNode;
    constructor(options: {
        id: string;
        icon: DomNode;
        activeIcon?: DomNode;
        title?: string;
        toFooter?: boolean;
    });
    set active(b: boolean);
    get active(): boolean;
}
//# sourceMappingURL=AppNavBarMenu.d.ts.map