import EventContainer from "../event/EventContainer.js";
export default class EventTreeNode extends EventContainer {
    parent: EventTreeNode | undefined;
    protected children: EventTreeNode[];
    append(...nodes: (EventTreeNode | undefined)[]): this;
    appendTo(node: EventTreeNode, index?: number): this;
    protected removeFromParent(): void;
    empty(): this;
    delete(): void;
}
//# sourceMappingURL=EventTreeNode.d.ts.map