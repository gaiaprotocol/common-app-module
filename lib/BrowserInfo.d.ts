declare class BrowserInfo {
    private store;
    private normalizeLanguage;
    get language(): string;
    set language(language: string);
    changeLanguage(language: string): void;
    get isPhoneSize(): boolean;
    get installed(): any;
    get isAndroid(): boolean;
    get isIOS(): boolean;
}
declare const _default: BrowserInfo;
export default _default;
//# sourceMappingURL=BrowserInfo.d.ts.map