import DomNode from "../dom/DomNode.js";
export interface ViewParamsV2 {
    [name: string]: string | undefined;
}
export default abstract class ViewV2 {
    protected closed: boolean;
    protected container: DomNode;
    changeParams(params: ViewParamsV2): void;
    close(): void;
}
//# sourceMappingURL=ViewV2.d.ts.map