import Component from "../Component.js";
export default class BottomMenuTab extends Component {
    _id;
    constructor(_id, icon, title) {
        super("li.tab");
        this._id = _id;
        this.append(icon, title);
    }
    set active(b) {
        b ? this.addClass("active") : this.deleteClass("active");
    }
    get active() {
        return this.hasClass("active");
    }
}
//# sourceMappingURL=BottomMenuTab.js.map