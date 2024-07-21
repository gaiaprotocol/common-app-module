export default class ViewV2 {
    closed = false;
    container;
    changeParams(params) { }
    close() {
        this.container?.delete();
        this.closed = true;
    }
}
//# sourceMappingURL=ViewV2.js.map