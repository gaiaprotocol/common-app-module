export default abstract class EventContainerV2<T extends Record<string, (...args: any[]) => any>> {
    private events;
    on<K extends keyof T>(eventName: K, eventHandler: T[K]): void;
    emit<K extends keyof T>(eventName: K, ...args: Parameters<T[K]>): ReturnType<T[K]>[];
}
//# sourceMappingURL=EventContainerV2.d.ts.map