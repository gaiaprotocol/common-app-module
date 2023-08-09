import RetroComponent from "./RetroComponent.js";
export default class RetroTitleBar extends RetroComponent {
    constructor(options: {
        title: string;
        buttons: {
            type: "close" | "help";
            click: () => void;
        }[];
    });
}
//# sourceMappingURL=RetroTitleBar.d.ts.map