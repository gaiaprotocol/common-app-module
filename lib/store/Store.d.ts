export default class Store {
    private name;
    constructor(name: string);
    private selectStorage;
    private getKey;
    set(key: string, value: any, permanently?: boolean): void;
    get<T>(key: string): T | undefined;
    getAll<T>(): {
        [key: string]: T;
    };
    checkPermanently(key: string): boolean;
    delete(...keys: string[]): void;
    clear(): void;
}
//# sourceMappingURL=Store.d.ts.map