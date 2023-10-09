import Component from "./Component.js";
export default class Snackbar extends Component {
    constructor(options: {
        message: string;
        action?: {
            title: string;
            click: () => void;
        };
    });
}
//# sourceMappingURL=SnackBar.d.ts.map