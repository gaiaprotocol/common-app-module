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
  private toggleFileTreeButton: Button | undefined;
  private fileTree: FileTree | undefined;

  constructor(treeId: string, data: FileTreeNodeData) {
    super(".file-tree-node");

    this.append(
      el(
        "main",
        data.children
          ? this.toggleFileTreeButton = new Button({
            type: ButtonType.Circle,
            icon: new MaterialIcon("keyboard_arrow_down"),
            onClick: () =>
              this.fileTree?.showing
                ? this.closeFileTree()
                : this.openFileTree(),
          })
          : undefined,
        el(".icon", data.icon.clone()),
        data.name,
      ),
    );

    if (data.children) {
      this.append(this.fileTree = new FileTree(treeId, data.children));
    }
  }

  private openFileTree() {
    this.toggleFileTreeButton!.icon = new MaterialIcon("keyboard_arrow_down");
    this.fileTree!.show();
  }

  private closeFileTree() {
    this.toggleFileTreeButton!.icon = new MaterialIcon("keyboard_arrow_right");
    this.fileTree!.hide();
  }
}
