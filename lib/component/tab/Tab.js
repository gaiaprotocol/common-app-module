import Component from "../Component.js";
export default class Tab extends Component {
    _id;
    constructor(_id, label) {
        super("li.tab");
        this._id = _id;
        this.append(label);
    }
    set active(b) {
        b ? this.addClass("active") : this.deleteClass("active");
    }
}
//# sourceMappingURL=Tab.js.map