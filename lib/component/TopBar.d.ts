import DomNode from "../dom/DomNode.js";
import Component from "./Component.js";
export default class TopBar extends Component {
    private activatedButton;
    constructor(options: {
        logo: DomNode;
    });
    activeButton(buttonName: string): void;
}
//# sourceMappingURL=TopBar.d.ts.map