import { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
export default class AppNavBar extends Component {
    private store;
    private ul;
    constructor(options: {
        id: string;
        logo: DomChild;
        menu: {
            id: string;
            icon: DomChild;
            title: string;
        }[];
    });
    init(id?: string): this;
    select(id: string): void;
}
//# sourceMappingURL=AppNavBar%20copy.d.ts.map