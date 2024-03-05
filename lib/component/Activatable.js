import Component from "./Component.js";
export default class Activatable extends Component {
    constructor(tag) {
        super(".activatable" + tag);
    }
    activate() {
        this.addClass("active");
    }
    deactivate() {
        this.deleteClass("active");
    }
}
//# sourceMappingURL=Activatable.js.map