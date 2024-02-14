import Component from "./Component.js";
export default class Tooltip extends Component {
    constructor(message) {
        super(".tooltip", message);
    }
    show(left, top) {
        this.style({ left: left - this.rect.width / 2, top: top + 8 });
    }
    hide() {
        this.style({ left: -999999, top: -999999 });
    }
}
//# sourceMappingURL=Tooltip.js.map