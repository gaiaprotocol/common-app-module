import Component from "./Component.js";
export class AutoSorterListItem extends Component {
}
export default class AutoSorterList extends Component {
    sortItems(ascending = true) {
        const parent = this.domElement;
        const sortedChildren = [...this.children].sort((a, b) => ascending ? a.sortValue - b.sortValue : b.sortValue - a.sortValue);
        let lastPlacedNode = null;
        for (const item of sortedChildren) {
            const currentDomNode = item.domElement;
            const nextSibling = lastPlacedNode
                ? lastPlacedNode.nextSibling
                : parent.firstChild;
            if (currentDomNode !== nextSibling) {
                parent.insertBefore(currentDomNode, nextSibling);
            }
            lastPlacedNode = currentDomNode;
        }
    }
}
//# sourceMappingURL=AutoSorterList.js.map