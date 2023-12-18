import { DomChild } from "../dom/DomNode.js";
import Component from "./Component.js";
export default class NavBar extends Component {
    private activated;
    constructor(options: {
        logo?: DomChild;
        menu: {
            id: string;
            icon: DomChild;
            title: string;
            uri: string;
        }[];
    });
    active(menu: string): void;
}
//# sourceMappingURL=NavBar.d.ts.map