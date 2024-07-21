import el from "../../dom/el.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";
import FileTree from "./FileTree.js";
export default class FileTreeNode extends Component {
    toggleFileTreeButton;
    fileTree;
    constructor(treeId, data) {
        super(".file-tree-node");
        this.append(el("main", data.children
            ? this.toggleFileTreeButton = new Button({
                type: ButtonType.Circle,
                icon: new MaterialIcon("keyboard_arrow_down"),
                onClick: () => this.fileTree?.showing
                    ? this.closeFileTree()
                    : this.openFileTree(),
            })
            : undefined, el(".icon", data.icon.clone()), data.name));
        if (data.children) {
            this.append(this.fileTree = new FileTree(treeId, data.children));
        }
    }
    openFileTree() {
        this.toggleFileTreeButton.icon = new MaterialIcon("keyboard_arrow_down");
        this.fileTree.show();
    }
    closeFileTree() {
        this.toggleFileTreeButton.icon = new MaterialIcon("keyboard_arrow_right");
        this.fileTree.hide();
    }
}
//# sourceMappingURL=FileTreeNode.js.map