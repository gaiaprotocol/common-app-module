export default class Debouncer {
    debounceTime;
    work;
    debounceTimeout;
    constructor(debounceTime, work) {
        this.debounceTime = debounceTime;
        this.work = work;
    }
    run(...params) {
        if (this.debounceTimeout !== undefined) {
            clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
            this.work(...params);
        }, this.debounceTime);
    }
}
//# sourceMappingURL=Debouncer.js.map