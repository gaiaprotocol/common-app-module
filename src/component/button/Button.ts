import DomNode, { DomChild } from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import ButtonType from "./ButtonType.js";

export default class Button extends Component<HTMLAnchorElement> {
  private titleContainer: DomNode | undefined;

  constructor(options: {
    tag?: string;
    type?: ButtonType;
    icon?: DomNode;
    title?: string;
    href?: string;
    disabled?: boolean;
    click?: (event: Event, node: Button) => void;
  }) {
    super(
      "button" +
        (options.type !== undefined ? "." + options.type : ".contained") +
        (options.tag ?? ""),
    );
    if (options.icon !== undefined) {
      this.append(options.icon);
    }
    if (options.title !== undefined) {
      this.append(
        this.titleContainer = el("span.title", options.title),
      );
    }
    if (options.href !== undefined) {
      this.domElement.href = options.href;
      this.domElement.target = "_blank";
    }
    if (options.disabled === true) {
      this.disable();
    }
    if (options.click !== undefined) {
      this.onDom("click", (event) => {
        if (this.hasClass("disabled") !== true) {
          options.click!(event, this);
        }
      });
    }
  }

  public set type(type: ButtonType) {
    this.deleteClass("contained", "outlined", "text");
    this.addClass(type);
  }

  public set title(title: DomChild) {
    if (this.titleContainer !== undefined) {
      this.titleContainer.empty().append(title);
    } else {
      this.append(this.titleContainer = el("span.title", title));
    }
  }

  public disable(): this {
    this.addClass("disabled");
    return this;
  }

  public enable(): this {
    this.deleteClass("disabled");
    return this;
  }
}
