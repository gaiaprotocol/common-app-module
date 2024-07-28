import DomNode from "../dom/DomNode.js";

export interface ViewParamsV2 {
  [name: string]: string | undefined;
}

export default abstract class ViewV2 {
  protected closed = false;
  protected container!: DomNode;

  public changeParams(params: ViewParamsV2): void {}
  public close(): void {
    this.container?.delete();
    this.closed = true;
  }
}
