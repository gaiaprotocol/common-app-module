import EventContainer from "../event/EventContainer.js";
import ArrayUtil from "../util/ArrayUtil.js";
import URIParser from "./URIParser.js";
const normalizePathname = (pathname) => decodeURIComponent(pathname.endsWith("/") ? pathname.slice(0, -1).substring(1) : pathname.substring(1));
const matchPattern = (uriParts, pattern, excludes, params) => pattern.some((pat) => URIParser.match(uriParts, pat.split("/"), params)) && !excludes.some((exclude) => URIParser.match(uriParts, exclude.split("/")));
class Router extends EventContainer {
    routes = [];
    redirects = [];
    openingViews = [];
    constructor() {
        super();
        window.addEventListener("popstate", (event) => {
            if (event.state !== null) {
                this.check(event.state);
            }
        });
    }
    check(preParams) {
        const uri = normalizePathname(location.pathname);
        const uriParts = uri.split("/");
        let viewCreated = false;
        const toCloseViews = [];
        for (const { patterns, excludes, to } of this.redirects) {
            const params = preParams ? { ...preParams } : {};
            if (matchPattern(uriParts, patterns, excludes, params)) {
                let uri = to;
                for (const [key, value] of Object.entries(params)) {
                    uri = uri.replace(new RegExp(`\{${key}\}`, "g"), value ?? "");
                }
                this.goNoHistory(`/${uri}`);
                return;
            }
        }
        for (const { patterns, excludes, viewType } of this.routes) {
            const params = preParams ? { ...preParams } : {};
            const openingView = this.openingViews.find((ov) => ov instanceof viewType);
            if (matchPattern(uriParts, patterns, excludes, params)) {
                if (openingView === undefined) {
                    this.openingViews.push(new viewType(params, uri));
                    viewCreated = true;
                }
                else {
                    openingView.changeParams(params, uri);
                }
            }
            else if (openingView !== undefined) {
                toCloseViews.push(openingView);
                ArrayUtil.pull(this.openingViews, openingView);
            }
        }
        for (const toCloseView of toCloseViews.reverse()) {
            toCloseView.close();
        }
        if (viewCreated === true) {
            this.fireEvent("go");
        }
    }
    route(patterns, viewType, excludes = []) {
        if (typeof patterns === "string") {
            patterns = [patterns];
        }
        this.routes.push({ patterns, excludes, viewType });
        const uri = normalizePathname(location.pathname);
        const uriParts = uri.split("/");
        const params = {};
        if (matchPattern(uriParts, patterns, excludes, params)) {
            this.openingViews.push(new viewType(params, uri));
        }
    }
    redirect(patterns, to, excludes = []) {
        if (typeof patterns === "string") {
            patterns = [patterns];
        }
        this.redirects.push({ patterns, excludes, to });
        const uri = normalizePathname(location.pathname);
        const uriParts = uri.split("/");
        const params = {};
        if (matchPattern(uriParts, patterns, excludes, params)) {
            let uri = to;
            for (const [key, value] of Object.entries(params)) {
                uri = uri.replace(new RegExp(`\{${key}\}`, "g"), value ?? "");
            }
            this.goNoHistory(`/${uri}`);
        }
    }
    go(uri, params) {
        if (location.pathname !== uri) {
            history.pushState(undefined, "", uri);
            this.check(params);
            window.scrollTo(0, 0);
        }
    }
    goNoHistory(uri, params) {
        if (location.pathname !== uri) {
            history.replaceState(undefined, "", uri);
            this.check(params);
            window.scrollTo(0, 0);
        }
    }
    waitAndGo(uri, params) {
        setTimeout(() => this.go(uri, params));
    }
    refresh() {
        for (const openingView of this.openingViews.reverse()) {
            openingView.close();
        }
        this.openingViews = [];
        const uri = normalizePathname(location.pathname);
        const uriParts = uri.split("/");
        for (const { patterns, excludes, viewType } of this.routes) {
            const params = {};
            if (matchPattern(uriParts, patterns, excludes, params)) {
                this.openingViews.push(new viewType(params, uri));
            }
        }
    }
}
export default new Router();
//# sourceMappingURL=Router.js.map