import DomNode, { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
import ButtonType from "./ButtonType.js";
export default class Button extends Component<HTMLAnchorElement> {
    private titleContainer;
    constructor(options: {
        tag?: string;
        type?: ButtonType;
        icon?: DomNode;
        title?: string;
        href?: string;
        disabled?: boolean;
        click?: (event: Event, node: Button) => void;
    });
    set type(type: ButtonType);
    set title(title: DomChild);
    disable(): this;
    enable(): this;
}
//# sourceMappingURL=Button.d.ts.map