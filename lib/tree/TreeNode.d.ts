import EventContainer from "../event/EventContainer.js";
export default class TreeNode extends EventContainer {
    parent: TreeNode | undefined;
    protected children: TreeNode[];
    append(...nodes: (TreeNode | undefined)[]): this;
    appendTo(node: TreeNode, index?: number): this;
    protected removeFromParent(): void;
    empty(): this;
    checkChild(target: TreeNode): boolean;
    delete(): void;
}
//# sourceMappingURL=TreeNode.d.ts.map