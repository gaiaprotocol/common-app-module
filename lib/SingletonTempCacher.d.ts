declare class SingletonTempCacher {
    private map;
    cache<DT>(id: string | number, data: DT): void;
    get<DT>(id: string | number): DT | undefined;
}
declare const _default: SingletonTempCacher;
export default _default;
//# sourceMappingURL=SingletonTempCacher.d.ts.map