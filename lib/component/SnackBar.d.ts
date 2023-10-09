import Component from "./Component.js";
export default class Snackbar extends Component {
    private timeoutId;
    constructor(options: {
        message: string;
        action?: {
            title: string;
            click: () => void;
        };
    });
    delete(): void;
}
//# sourceMappingURL=Snackbar.d.ts.map