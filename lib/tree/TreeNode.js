import ArrayUtil from "../util/ArrayUtil.js";
export default class TreeNode {
    parent;
    children = [];
    deleted = false;
    append(...nodes) {
        for (const node of nodes) {
            if (node !== undefined) {
                node.appendTo(this);
            }
        }
        return this;
    }
    appendTo(node, index) {
        if (this.parent === node && index !== undefined &&
            this.parent.children.indexOf(this) < index) {
            index -= 1;
        }
        this.removeFromParent();
        if (index !== undefined && index < node.children.length) {
            node.children.splice(index, 0, this);
        }
        else {
            node.children.push(this);
        }
        this.parent = node;
        return this;
    }
    removeFromParent() {
        if (this.parent !== undefined) {
            ArrayUtil.pull(this.parent.children, this);
            this.parent = undefined;
        }
    }
    empty() {
        while (this.children.length > 0) {
            this.children[0].delete();
        }
        return this;
    }
    delete() {
        this.removeFromParent();
        this.empty();
        this.children = undefined;
        this.deleted = true;
    }
}
//# sourceMappingURL=TreeNode.js.map