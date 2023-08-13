import RetroComponent from "./RetroComponent.js";
export default class RetroDropdownMenu extends RetroComponent {
    constructor(options: {
        x: number;
        y: number;
        menus: {
            label: string;
            click: () => void;
        }[];
    });
    private windowClickHandler;
    delete(): void;
}
//# sourceMappingURL=RetroDropdownMenu.d.ts.map