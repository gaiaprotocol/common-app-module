import EventContainer from "../event/EventContainer.js";
import ArrayUtil from "../util/ArrayUtil.js";
export default class TreeNode extends EventContainer {
    parent;
    children = [];
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
    checkChild(target) {
        const stack = [...this.children];
        while (stack.length > 0) {
            const current = stack.pop();
            if (current === target)
                return true;
            stack.push(...current.children);
        }
        return false;
    }
    delete() {
        super.delete();
        this.removeFromParent();
        this.empty();
        this.children = undefined;
    }
}
//# sourceMappingURL=TreeNode.js.map