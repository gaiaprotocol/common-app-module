import DomNode from "../dom/DomNode.js";

export interface ViewParams {
  [name: string]: string | undefined;
}

export default abstract class View {
  protected closed = false;
  protected container: DomNode | undefined;

  public changeParams(params: ViewParams, uri: string): void {}
  public close(): void {
    this.container?.delete();
    this.closed = true;
  }
}
