export default class TreeNode {
    parent: TreeNode | undefined;
    protected children: TreeNode[];
    protected deleted: boolean;
    append(...nodes: (TreeNode | undefined)[]): this;
    appendTo(node: TreeNode, index?: number): this;
    protected removeFromParent(): void;
    empty(): this;
    delete(): void;
}
//# sourceMappingURL=TreeNode.d.ts.map