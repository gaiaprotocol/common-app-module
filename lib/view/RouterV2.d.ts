import ViewV2 from "./ViewV2.js";
type ViewClass = new () => ViewV2;
declare class RouterV2 {
    private routes;
    private viewOpening;
    private openingViews;
    constructor();
    private openView;
    route(uri: string, View: ViewClass): void;
    private changeUri;
    go(uri: string): void;
}
declare const _default: RouterV2;
export default _default;
//# sourceMappingURL=RouterV2.d.ts.map