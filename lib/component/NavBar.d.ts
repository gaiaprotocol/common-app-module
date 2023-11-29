import { DomChild } from "../dom/DomNode.js";
import Component from "./Component.js";
export default class NavBar extends Component {
    private activatedButton;
    constructor(options: {
        logo?: DomChild;
        menu: {
            title: DomChild;
            uri: string;
        }[];
    });
    activeButton(buttonName: string): void;
}
//# sourceMappingURL=NavBar.d.ts.map