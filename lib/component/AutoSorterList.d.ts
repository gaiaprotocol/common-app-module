import Component from "./Component.js";
export declare abstract class AutoSorterListItem extends Component {
    abstract get sortValue(): number;
}
export default class AutoSorterList<CT extends AutoSorterListItem> extends Component<HTMLElement, CT> {
    sortItems(ascending?: boolean): void;
}
//# sourceMappingURL=AutoSorterList.d.ts.map