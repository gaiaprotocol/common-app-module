import Component from "../Component.js";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";
export default class FileTree extends Component<HTMLElement, FileTreeNode> {
    constructor(id: string, children: FileTreeNodeData[]);
    show(): void;
    hide(): void;
    get showing(): boolean;
}
//# sourceMappingURL=FileTree.d.ts.map