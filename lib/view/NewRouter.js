if (!window.URLPattern) {
    await import("urlpattern-polyfill");
}
class NewRouter {
    routes = [];
    route(pathname, viewType) {
        const patterns = Array.isArray(pathname)
            ? pathname.map((path) => new URLPattern({ pathname: path }))
            : [new URLPattern({ pathname })];
        this.routes.push({ patterns, viewType });
    }
}
export default new NewRouter();
//# sourceMappingURL=NewRouter.js.map