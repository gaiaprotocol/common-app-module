export default class View {
    closed = false;
    container;
    changeParams(params, uri) { }
    close() {
        this.container?.delete();
        this.closed = true;
    }
}
//# sourceMappingURL=View.js.map