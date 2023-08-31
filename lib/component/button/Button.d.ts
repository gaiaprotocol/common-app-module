import DomNode from "../../dom/DomNode.js";
import Component from "../Component.js";
import ButtonType from "./ButtonType.js";
export default class Button extends Component<HTMLAnchorElement> {
    private titleContainer;
    constructor(options: {
        tag?: string;
        type?: ButtonType;
        icon?: DomNode;
        title?: string | DomNode;
        href?: string;
        disabled?: boolean;
        click?: (event: Event, node: DomNode) => void;
    });
    set title(title: string);
    disable(): void;
    enable(): void;
}
//# sourceMappingURL=Button.d.ts.map