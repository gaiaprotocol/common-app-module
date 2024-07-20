export default class EventContainerV2 {
    on(eventName, eventHandler) {
    }
    emit(eventName, ...args) {
        throw new Error("Not implemented");
    }
}
class TestEventContainer extends EventContainerV2 {
    test() {
        this.on("test2", (test) => { });
        this.emit("test2", 1);
    }
}
//# sourceMappingURL=EventContainerV2.js.map