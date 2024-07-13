import Component from "../Component.js";
import FileTreeNode from "./FileTreeNode.js";
export default class FileTree extends Component {
    constructor(id, children) {
        super(".file-tree");
        for (const child of children) {
            this.append(new FileTreeNode(id, child));
        }
    }
    show() {
        this.deleteClass("hidden");
    }
    hide() {
        this.addClass("hidden");
    }
    get showing() {
        return !this.hasClass("hidden");
    }
}
//# sourceMappingURL=FileTree.js.map