import BodyNode from "../dom/BodyNode.js";
import EventContainer from "../event/EventContainer.js";
import ArrayUtil from "../util/ArrayUtil.js";
import URIParser from "./URIParser.js";
import View, { ViewParams } from "./View.js";

export type ViewType = new (...args: any[]) => View;

const normalizePathname = (pathname: string) =>
  decodeURIComponent(
    pathname.endsWith("/")
      ? pathname.slice(0, -1).substring(1)
      : pathname.substring(1),
  );

const matchPattern = (
  uriParts: string[],
  pattern: string[],
  excludes: string[],
  params: ViewParams,
) =>
  pattern.some((pat) => URIParser.match(uriParts, pat.split("/"), params)) &&
  !excludes.some((exclude) => URIParser.match(uriParts, exclude.split("/")));

class Router extends EventContainer {
  private routes: {
    patterns: string[];
    excludes: string[];
    viewType: ViewType;
  }[] = [];
  private redirects: { patterns: string[]; excludes: string[]; to: string }[] =
    [];
  private openingViews: View[] = [];
  private forwarding = false;

  constructor() {
    super();
    this.addAllowedEvents("go");

    window.addEventListener("popstate", (event) => {
      if (this.forwarding === true) {
        this.forwarding = false;
      } else {
        const openedPopup = (BodyNode.children as any).findLast((child: any) =>
          child.hasClass("popup-background")
        );
        if (openedPopup) {
          this.forwarding = true;
          window.history.forward();
          openedPopup.delete();
        } else {
          this.check(event.state ?? undefined);
        }
      }
      for (const child of BodyNode.children) {
        if (child.hasClass("dropdown-menu")) {
          child.delete();
        }
      }
    });
  }

  public closeAllPopup() {
    for (const child of BodyNode.children) {
      if (child.hasClass("popup-background")) {
        child.delete();
      }
    }
  }

  public check(preParams?: ViewParams) {
    const uri = normalizePathname(location.pathname);
    const uriParts = uri.split("/");

    let viewCreated = false;
    const toCloseViews: View[] = [];

    for (const { patterns, excludes, to } of this.redirects) {
      const params: ViewParams = preParams ? { ...preParams } : {};
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
      const params: ViewParams = preParams ? { ...preParams } : {};
      const openingView = this.openingViews.find((ov) =>
        ov instanceof viewType
      );
      if (matchPattern(uriParts, patterns, excludes, params)) {
        if (openingView === undefined) {
          this.openingViews.push(new viewType(params, uri));
          viewCreated = true;
        } else {
          openingView.changeParams(params, uri);
        }
      } else if (openingView !== undefined) {
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

  public route(
    patterns: string | string[],
    viewType: ViewType,
    excludes: string[] = [],
  ) {
    if (typeof patterns === "string") {
      patterns = [patterns];
    }
    this.routes.push({ patterns, excludes, viewType });

    const uri = normalizePathname(location.pathname);
    const uriParts = uri.split("/");
    const params: ViewParams = {};
    if (matchPattern(uriParts, patterns, excludes, params)) {
      this.openingViews.push(new viewType(params, uri));
    }
  }

  public redirect(
    patterns: string | string[],
    to: string,
    excludes: string[] = [],
  ) {
    if (typeof patterns === "string") {
      patterns = [patterns];
    }
    this.redirects.push({ patterns, excludes, to });

    const uri = normalizePathname(location.pathname);
    const uriParts = uri.split("/");
    const params: ViewParams = {};
    if (matchPattern(uriParts, patterns, excludes, params)) {
      let uri = to;
      for (const [key, value] of Object.entries(params)) {
        uri = uri.replace(new RegExp(`\{${key}\}`, "g"), value ?? "");
      }
      this.goNoHistory(`/${uri}`);
    }
  }

  public go(uri: string, params?: ViewParams) {
    if (location.pathname !== uri) {
      history.pushState(undefined, "", uri);
      this.check(params);
      window.scrollTo(0, 0);
    }
  }

  public goNoHistory(uri: string, params?: ViewParams) {
    if (location.pathname !== uri) {
      history.replaceState(undefined, "", uri);
      this.check(params);
      window.scrollTo(0, 0);
    }
  }

  public waitAndGo(uri: string, params?: ViewParams) {
    setTimeout(() => this.go(uri, params));
  }

  public refresh() {
    for (const openingView of this.openingViews.reverse()) {
      openingView.close();
    }
    this.openingViews = [];

    const uri = normalizePathname(location.pathname);
    const uriParts = uri.split("/");
    for (const { patterns, excludes, viewType } of this.routes) {
      const params: ViewParams = {};
      if (matchPattern(uriParts, patterns, excludes, params)) {
        this.openingViews.push(new viewType(params, uri));
      }
    }
  }
}

export default new Router();
