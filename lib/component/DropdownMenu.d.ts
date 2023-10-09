import Component from "./Component.js";
export default class DropdownMenu extends Component {
    constructor(options: {
        left: number;
        top: number;
        items: {
            title: string;
            click: () => void;
        }[];
    });
    private windowClickHandler;
    delete(): void;
}
//# sourceMappingURL=DropdownMenu.d.ts.map