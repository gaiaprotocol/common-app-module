class SingletonTempCacher {
    map = new Map();
    cache(id, data) {
        this.map.set(id, data);
    }
    get(id) {
        return this.map.get(id);
    }
}
export default new SingletonTempCacher();
//# sourceMappingURL=SingletonTempCacher.js.map