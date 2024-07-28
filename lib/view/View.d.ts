import DomNode from "../dom/DomNode.js";
export interface ViewParamsV2 {
    [name: string]: string | undefined;
}
export default abstract class View {
    protected closed: boolean;
    protected container: DomNode;
    changeParams(params: ViewParamsV2): void;
    close(): void;
}
//# sourceMappingURL=View.d.ts.map