import DomNode from "../dom/DomNode.js";
import Component from "./Component.js";
export default class DropdownMenu extends Component {
    private ul;
    constructor(options: {
        left: number;
        top: number;
        items: {
            icon?: DomNode;
            title: string;
            click: () => void;
        }[];
        footer?: DomNode;
    });
    private windowClickHandler;
    delete(): void;
}
//# sourceMappingURL=DropdownMenu.d.ts.map