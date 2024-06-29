import View from "./View.js";
type ViewType = new (...args: any[]) => View;
declare class NewRouter {
    private routes;
    route(pathname: string | string[], viewType: ViewType): void;
}
declare const _default: NewRouter;
export default _default;
//# sourceMappingURL=NewRouter.d.ts.map