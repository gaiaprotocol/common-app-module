import EventContainer from "../event/EventContainer.js";
import View, { ViewParams } from "./View.js";
export type ViewType = new (...args: any[]) => View;
declare class Router extends EventContainer {
    private routes;
    private redirects;
    private openingViews;
    private forwarding;
    private exitableDeleted;
    constructor();
    check(preParams?: ViewParams, data?: any): void;
    route(patterns: string | string[], viewType: ViewType, excludes?: string[]): void;
    redirect(patterns: string | string[], to: string, excludes?: string[]): void;
    go(uri: string, params?: ViewParams, data?: any): void;
    changeUri(uri: string): void;
    goNoHistory(uri: string, params?: ViewParams, data?: any): void;
    waitAndGo(uri: string, params?: ViewParams, data?: any): void;
    refresh(): void;
}
declare const _default: Router;
export default _default;
//# sourceMappingURL=Router.d.ts.map