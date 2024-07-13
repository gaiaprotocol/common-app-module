import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
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
  constructor(treeId: string, data: FileTreeNodeData) {
    super(".file-tree-node");

    this.append(
      el(
        "main",
        data.children
          ? new Button({
            type: ButtonType.Circle,
            icon: new MaterialIcon("keyboard_arrow_down"),
          })
          : undefined,
        el(".icon", data.icon.clone()),
        data.name,
      ),
    );

    if (data.children) {
      this.append(new FileTree(treeId, data.children));
    }
  }
}
