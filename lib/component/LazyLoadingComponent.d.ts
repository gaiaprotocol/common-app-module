import Component from "./Component.js";
export default abstract class LazyLoadingComponent extends Component {
    private loaded;
    constructor(tag: string);
    protected abstract load(): void;
    show(): void;
    hide(): void;
}
//# sourceMappingURL=LazyLoadingComponent.d.ts.map