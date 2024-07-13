import DomNode from "../../dom/DomNode.js";
import Component from "../Component.js";
export interface FileTreeNodeData {
    icon: DomNode;
    name: string;
    children?: FileTreeNodeData[];
    onClick?: () => void;
}
export default class FileTreeNode extends Component {
    private toggleFileTreeButton;
    private fileTree;
    constructor(treeId: string, data: FileTreeNodeData);
    private openFileTree;
    private closeFileTree;
}
//# sourceMappingURL=FileTreeNode.d.ts.map