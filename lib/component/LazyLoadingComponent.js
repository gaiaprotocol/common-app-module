import Component from "./Component.js";
export default class LazyLoadingComponent extends Component {
    loaded = false;
    constructor(tag) {
        super(tag + ".lazy-loading-component");
        this.addClass("hidden");
    }
    show() {
        this.deleteClass("hidden");
        if (!this.loaded) {
            this.load();
            this.loaded = true;
        }
    }
    hide() {
        this.addClass("hidden");
    }
}
//# sourceMappingURL=LazyLoadingComponent.js.map