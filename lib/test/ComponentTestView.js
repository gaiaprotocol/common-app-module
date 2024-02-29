import Button from "../component/button/Button.js";
import ButtonType from "../component/button/ButtonType.js";
import FileDropArea from "../component/rich/FileDropArea.js";
import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import View from "../view/View.js";
import TestAdaptiveModal from "./TestAdaptiveModal.js";
import TestDrawer from "./TestDrawer.js";
export default class ComponentTestView extends View {
    form;
    input;
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
        })), el("section.adaptive-modal", el("h2", "Adaptive Modal"), el("p", "This is a test of the adaptive modal component."), new Button({
            title: "Open Adaptive Modal",
            click: () => new TestAdaptiveModal(),
        })), el("section.form", el("h2", "Form"), el("p", "This is a test of the form component."), this.form = el("form", el(".input-container", this.input = new FileDropArea({ tag: "p.message-input", contenteditable: true }, (files) => console.log(files))), new Button({
            type: ButtonType.Contained,
            tag: ".send",
            title: "Send",
        }), { submit: (event) => this.submit(event) }))));
        this.input.onDom("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey && event.keyCode !== 229) {
                this.submit(event);
            }
        });
    }
    submit(event) {
        event.preventDefault();
        console.log("TEST!");
    }
}
//# sourceMappingURL=ComponentTestView.js.map