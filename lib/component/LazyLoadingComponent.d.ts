import DomNode from "../dom/DomNode.js";
import Component from "./Component.js";
export default abstract class LazyLoadingComponent<EL extends HTMLElement = HTMLElement, CT extends DomNode = DomNode> extends Component<EL, CT> {
    loaded: boolean;
    constructor(tag: string);
    protected abstract load(): void;
    show(): void;
    hide(): void;
}
//# sourceMappingURL=LazyLoadingComponent.d.ts.map