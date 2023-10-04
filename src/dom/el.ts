import DomNode, { DomChild } from "./DomNode.js";

const el: <EL extends HTMLElement>(
  tag: string,
  ...children: DomChild[]
) => DomNode<EL> = <EL extends HTMLElement>(
  tag: string,
  ...children: DomChild[]
) => {
  return new DomNode<EL>(DomNode.createElement(tag) as EL, ...children);
};

export default el;
