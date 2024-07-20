export default abstract class EventContainerV2<
  T extends Record<string, (...args: any[]) => any>,
> {
  public on<K extends keyof T>(eventName: K, eventHandler: T[K]): void {
  }

  public emit<K extends keyof T>(
    eventName: K,
    ...args: Parameters<T[K]>
  ): ReturnType<T[K]> {
    throw new Error("Not implemented");
  }
}

class TestEventContainer extends EventContainerV2<{
  test: (test: number) => void;
  test2: (test: number) => void;
}> {
  public test() {
    this.on("test2", (test: number) => {});
    this.emit("test2", 1);
  }
}
