import EventContainer from "../event/EventContainer.js";
import View, { ViewParams } from "./View.js";
export type ViewType = new (...args: any[]) => View;
declare class Router extends EventContainer {
    private routes;
    private redirects;
    private openingViews;
    private forwarding;
    constructor();
    check(preParams?: ViewParams): void;
    route(patterns: string | string[], viewType: ViewType, excludes?: string[]): void;
    redirect(patterns: string | string[], to: string, excludes?: string[]): void;
    go(uri: string, params?: ViewParams): void;
    goNoHistory(uri: string, params?: ViewParams): void;
    waitAndGo(uri: string, params?: ViewParams): void;
    refresh(): void;
}
declare const _default: Router;
export default _default;
//# sourceMappingURL=Router.d.ts.map