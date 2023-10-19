import ArrayUtil from "../util/ArrayUtil.js";
export default class EventContainer {
    static NEXT_ID = 0;
    id = EventContainer.NEXT_ID++;
    allowedEvents = ["delete"];
    eventMap = {};
    delegateEvents = [];
    deleted = false;
    addAllowedEvents(...events) {
        this.allowedEvents.push(...events);
    }
    addEventHandler(eventName, eventHandler) {
        if (!this.allowedEvents.includes(eventName)) {
            throw new Error(`EventContainer ${this.constructor.name} does not allow event ${eventName}`);
        }
        if (this.eventMap[eventName] === undefined) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(eventHandler);
    }
    removeDelegateEvents(delegateEvents) {
        for (const [eventName, events] of Object.entries(delegateEvents.events)) {
            for (const event of events) {
                delegateEvents.delegate.off(eventName, event);
            }
        }
        ArrayUtil.pull(this.delegateEvents, delegateEvents);
    }
    on(eventName, eventHandler) {
        if (Array.isArray(eventName)) {
            for (const name of eventName) {
                this.addEventHandler(name, eventHandler);
            }
        }
        else {
            this.addEventHandler(eventName, eventHandler);
        }
        return this;
    }
    once(eventName, eventHandler) {
        const onceEventHandler = (...params) => {
            this.off(eventName, onceEventHandler);
            eventHandler(...params);
        };
        this.addEventHandler(eventName, onceEventHandler);
    }
    off(eventName, eventHandler) {
        if (this.eventMap?.[eventName] !== undefined) {
            ArrayUtil.pull(this.eventMap[eventName], eventHandler);
            if (this.eventMap[eventName].length === 0) {
                delete this.eventMap[eventName];
            }
        }
    }
    async fireEvent(eventName, ...params) {
        if (!this.allowedEvents.includes(eventName)) {
            throw new Error(`EventContainer ${this.constructor.name} does not allow event ${eventName}`);
        }
        const results = [];
        const promises = [];
        const events = this.eventMap[eventName];
        if (events !== undefined) {
            for (const eventHandler of [...events]) {
                if (events.includes(eventHandler)) {
                    const result = eventHandler(...params);
                    if (result instanceof Promise) {
                        promises.push(result);
                    }
                    else {
                        results.push(result);
                    }
                }
            }
        }
        return results.concat(await Promise.all(promises));
    }
    onDelegate(delegate, eventNames, eventHandler) {
        let delegateEvents = this.delegateEvents.find((de) => de.delegate === delegate);
        if (delegateEvents === undefined) {
            delegateEvents = { delegate, events: {} };
            this.delegateEvents.push(delegateEvents);
        }
        if (typeof eventNames === "string")
            eventNames = [eventNames];
        for (const eventName of eventNames) {
            if (delegateEvents.events[eventName] === undefined) {
                delegateEvents.events[eventName] = [];
            }
            delegateEvents.events[eventName].push(eventHandler);
            delegate.on(eventName, eventHandler);
        }
    }
    offDelegate(delegate) {
        const delegateEvents = this.delegateEvents.find((de) => de.delegate === delegate);
        if (delegateEvents !== undefined) {
            this.removeDelegateEvents(delegateEvents);
        }
    }
    offAll() {
        this.eventMap = {};
        for (const delegateEvents of [...this.delegateEvents]) {
            this.removeDelegateEvents(delegateEvents);
        }
        this.delegateEvents = [];
    }
    delete() {
        for (const delegateEvents of [...this.delegateEvents]) {
            this.removeDelegateEvents(delegateEvents);
        }
        this.delegateEvents = undefined;
        this.fireEvent("delete");
        this.allowedEvents = undefined;
        this.eventMap = undefined;
        this.deleted = true;
    }
}
//# sourceMappingURL=EventContainer.js.map