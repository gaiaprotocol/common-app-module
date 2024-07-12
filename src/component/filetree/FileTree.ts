import Component from "../Component.js";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";

export default class FileTree extends Component<HTMLElement, FileTreeNode> {
  constructor(children: FileTreeNodeData[]) {
    super(".file-tree");
    for (const child of children) {
      this.append(new FileTreeNode(child));
    }
  }
}
