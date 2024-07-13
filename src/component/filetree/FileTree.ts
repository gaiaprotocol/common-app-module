import Component from "../Component.js";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";

export default class FileTree extends Component<HTMLElement, FileTreeNode> {
  constructor(id: string, children: FileTreeNodeData[]) {
    super(".file-tree");
    for (const child of children) {
      this.append(new FileTreeNode(id, child));
    }
  }

  public show() {
    this.deleteClass("hidden");
  }

  public hide() {
    this.addClass("hidden");
  }

  public get showing() {
    return !this.hasClass("hidden");
  }
}
