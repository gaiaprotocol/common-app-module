import DomNode from "./DomNode.js";
const el = (tag, ...children) => {
    return new DomNode(DomNode.createElement(tag), ...children);
};
export default el;
//# sourceMappingURL=el.js.map