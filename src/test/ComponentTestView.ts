import Button from "../component/button/Button.js";
import ButtonType from "../component/button/ButtonType.js";
import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import View, { ViewParams } from "../view/View.js";

export default class ComponentTestView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(
      this.container = el(
        ".component-test-view.test-view",
        el("h1", "Component Test View"),
        el(
          "section.buttons",
          el("h2", "Buttons"),
          el("p", "This is a test of the button component."),
          el(
            ".button-container",
            new Button({
              title: "Text",
            }),
            new Button({
              type: ButtonType.Contained,
              title: "Contained",
            }),
            new Button({
              type: ButtonType.Outlined,
              title: "Outlined",
            }),
          ),
        ),
      ),
    );
  }
}
