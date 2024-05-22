import Component from "./Component.js";
export default class Activatable extends Component {
    constructor(tag) {
        super(tag + ".activatable");
    }
    activate() {
        this.addClass("active");
    }
    deactivate() {
        this.deleteClass("active");
    }
    get activated() {
        return this.hasClass("active");
    }
}
//# sourceMappingURL=Activatable.js.map