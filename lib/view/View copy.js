export default class View {
    closed = false;
    container;
    changeParams(params, uri, data) { }
    close() {
        this.container?.delete();
        this.closed = true;
    }
}
//# sourceMappingURL=View%20copy.js.map