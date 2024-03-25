import Exitable from "../component/exitable/Exitable.js";
import BodyNode from "../dom/BodyNode.js";
import EventContainer from "../event/EventContainer.js";
import ArrayUtil from "../util/ArrayUtil.js";
import UriParser from "./UriParser.js";
const normalizePathname = (pathname) => decodeURIComponent(pathname.endsWith("/")
    ? pathname.slice(0, -1).substring(1)
    : pathname.substring(1));
const matchPattern = (uriParts, pattern, excludes, params) => pattern.some((pat) => UriParser.match(uriParts, pat.split("/"), params)) &&
    !excludes.some((exclude) => UriParser.match(uriParts, exclude.split("/")));
class Router extends EventContainer {
    routes = [];
    redirects = [];
    openingViews = [];
    forwarding = false;
    constructor() {
        super();
        this.addAllowedEvents("go");
        window.addEventListener("popstate", (event) => {
            if (this.forwarding === true) {
                this.forwarding = false;
            }
            else {
                const exitable = BodyNode.children.findLast((child) => child instanceof Exitable);
                if (exitable) {
                    this.forwarding = true;
                    window.history.forward();
                    exitable.delete();
                }
                else {
                    this.check(event.state ?? undefined);
                }
            }
            for (const child of BodyNode.children) {
                if (child.hasClass("dropdown-menu")) {
                    child.delete();
                }
            }
        });
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                const exitable = BodyNode.children.findLast((child) => child instanceof Exitable);
                exitable?.delete();
            }
        });
    }
    deleteAllExitable() {
        for (const child of BodyNode.children) {
            if (child instanceof Exitable) {
                child.delete();
            }
        }
    }
    check(preParams, data) {
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
                this.goNoHistory(`/${uri}`, params, data);
                return;
            }
        }
        for (const { patterns, excludes, viewType } of this.routes) {
            const params = preParams ? { ...preParams } : {};
            const openingView = this.openingViews.find((ov) => ov instanceof viewType);
            if (matchPattern(uriParts, patterns, excludes, params)) {
                if (openingView === undefined) {
                    this.openingViews.push(new viewType(params, uri, data));
                    viewCreated = true;
                }
                else {
                    openingView.changeParams(params, uri, data);
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
    go(uri, params, data) {
        if (location.pathname !== uri) {
            history.pushState(undefined, "", uri);
            this.check(params, data);
            window.scrollTo(0, 0);
        }
    }
    changeUri(uri) {
        history.replaceState(undefined, "", uri);
    }
    goNoHistory(uri, params, data) {
        if (location.pathname !== uri) {
            history.replaceState(undefined, "", uri);
            this.check(params, data);
            window.scrollTo(0, 0);
        }
    }
    waitAndGo(uri, params, data) {
        setTimeout(() => this.go(uri, params, data));
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