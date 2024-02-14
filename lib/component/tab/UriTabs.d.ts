import { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
import Tab from "./Tab.js";
export default class UriTabs extends Component {
    children: Tab[];
    constructor(tabs: {
        uri: string;
        label: DomChild | DomChild[];
        active?: boolean;
    }[]);
    active(uri: string): void;
}
//# sourceMappingURL=UriTabs.d.ts.map