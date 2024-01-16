import DomNode from "../../dom/DomNode.js";
import Component from "../Component.js";
export default class Select<VT = string> extends Component {
    private _value;
    private _options;
    private valueDisplay;
    private optionContainer;
    constructor(o: {
        label?: string;
        placeholder?: string;
        options: {
            dom: DomNode;
            value: VT;
        }[];
        defaultValue?: VT;
    });
    get value(): VT | undefined;
    set value(value: VT | undefined);
    get options(): {
        dom: DomNode;
        value: VT;
    }[];
    set options(options: {
        dom: DomNode;
        value: VT;
    }[]);
}
//# sourceMappingURL=Select.d.ts.map