import DomSelector from "./DomSelector.js";
import DomUtil from "./DomUtil.js";

export type DomChild = DomNode;

export default class DomNode<HE extends HTMLElement = HTMLElement> {
  private htmlElement: HE;

  constructor(htmlElement?: HE | DomSelector, ...children: DomChild[]) {
    this.htmlElement = htmlElement instanceof HTMLElement
      ? htmlElement
      : DomUtil.createHtmlElement<HE>(htmlElement ?? "");
    this.append(...children);
  }

  private append(...children: DomChild[]) {
    //TODO:
  }
}
