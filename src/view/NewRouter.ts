import View from "./View.js";

if (!(window as any).URLPattern) {
  await import("urlpattern-polyfill");
}

type ViewType = new (...args: any[]) => View;

class NewRouter {
  private routes: { patterns: URLPattern[]; viewType: ViewType }[] = [];

  public route(pathname: string | string[], viewType: ViewType) {
    const patterns = Array.isArray(pathname)
      ? pathname.map((path) => new URLPattern({ pathname: path }))
      : [new URLPattern({ pathname })];
    this.routes.push({ patterns, viewType });

    /*const pattern = new URLPattern({ pathname });
    const matchingPath = pattern.exec(location.pathname);
    if (!matchingPath) return;

    const params = matchingPath.pathname.groups;
    console.log(params);*/
  }
}

export default new NewRouter();
