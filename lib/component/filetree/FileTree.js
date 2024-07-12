import Component from "../Component.js";
import FileTreeNode from "./FileTreeNode.js";
export default class FileTree extends Component {
    constructor(children) {
        super(".file-tree");
        for (const child of children) {
            this.append(new FileTreeNode(child));
        }
    }
}
//# sourceMappingURL=FileTree.js.map