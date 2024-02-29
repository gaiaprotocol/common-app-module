import Button from "../component/button/Button.js";
import ButtonType from "../component/button/ButtonType.js";
import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import View from "../view/View.js";
import TestDrawer from "./TestDrawer.js";
export default class ComponentTestView extends View {
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".component-test-view.test-view", el("h1", "Component Test View"), el("section.buttons", el("h2", "Buttons"), el("p", "This is a test of the button component."), el(".button-container", new Button({
            title: "Text",
        }), new Button({
            type: ButtonType.Contained,
            title: "Contained",
        }), new Button({
            type: ButtonType.Outlined,
            title: "Outlined",
        }))), el("section.drawer", el("h2", "Drawer"), el("p", "This is a test of the drawer component."), new Button({
            title: "Open Drawer",
            click: () => new TestDrawer(),
        }))));
    }
}
//# sourceMappingURL=ComponentTestView.js.map