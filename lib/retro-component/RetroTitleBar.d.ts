import DomNode from "../dom/DomNode.js";
import RetroComponent from "./RetroComponent.js";
export default class RetroTitleBar extends RetroComponent {
    constructor(options: {
        title: string | DomNode;
        buttons: {
            type: "close" | "help";
            click: () => void;
        }[];
    });
}
//# sourceMappingURL=RetroTitleBar.d.ts.map