import DomNode, { DomChild } from "./DomNode.js";

const el: <
  EL extends HTMLElement,
  CT extends DomNode = DomNode<HTMLElement, any>,
>(
  tag: string,
  ...children: DomChild[]
) => DomNode<EL, CT> = <
  EL extends HTMLElement,
  CT extends DomNode = DomNode<HTMLElement, any>,
>(
  tag: string,
  ...children: DomChild[]
) => {
  return new DomNode<EL, CT>(DomNode.createElement(tag) as EL, ...children);
};

export default el;
