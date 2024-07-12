import DomNode from "../../dom/DomNode.js";
import Button from "../button/Button.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";
import FileTree from "./FileTree.js";

export interface FileTreeNodeData {
  icon: DomNode;
  name: string;
  children?: FileTreeNodeData[];
  onClick?: () => void;
}

export default class FileTreeNode extends Component {
  constructor(data: FileTreeNodeData) {
    super(".file-tree-node");

    this.append(
      data.children
        ? new Button({
          icon: new MaterialIcon("keyboard_arrow_down"),
        })
        : undefined,
      data.icon.clone(),
      data.name,
    );

    if (data.children) {
      this.append(new FileTree(data.children));
    }
  }
}
