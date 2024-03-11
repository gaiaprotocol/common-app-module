import Component from "./Component.js";

export abstract class AutoSorterListItem extends Component {
  public abstract get sortValue(): number;
}

export default class AutoSorterList<CT extends AutoSorterListItem>
  extends Component<HTMLElement, CT> {
  public sortItems(ascending: boolean = true) {
    const parent = this.domElement;
    console.log(this.children.map((c) => c.sortValue));

    const sortedChildren = [...this.children].sort((a, b) =>
      ascending ? a.sortValue - b.sortValue : b.sortValue - a.sortValue
    );

    console.log(sortedChildren.map((c) => c.sortValue));

    let lastPlacedNode: ChildNode | null = null;
    for (const item of sortedChildren) {
      const currentDomNode = item.domElement;
      const nextSibling: ChildNode | null = lastPlacedNode
        ? lastPlacedNode.nextSibling
        : parent.firstChild;

      if (currentDomNode !== nextSibling) {
        parent.insertBefore(currentDomNode, nextSibling);
      }
      lastPlacedNode = currentDomNode;
    }
  }
}
