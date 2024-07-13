import DomNode from "../../dom/DomNode.js";
import Component from "../Component.js";
export interface FileTreeNodeData {
    icon: DomNode;
    name: string;
    children?: FileTreeNodeData[];
    onClick?: () => void;
}
export default class FileTreeNode extends Component {
    constructor(treeId: string, data: FileTreeNodeData);
}
//# sourceMappingURL=FileTreeNode.d.ts.map