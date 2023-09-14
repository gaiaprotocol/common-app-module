import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import ButtonType from "./ButtonType.js";

export default class Button extends Component<HTMLAnchorElement> {
  private titleContainer: DomNode | undefined;

  private titleText: string | undefined;

  constructor(options: {
    tag?: string;
    type?: ButtonType;
    icon?: DomNode;
    title?: string;
    href?: string;
    disabled?: boolean;
    click?: (event: Event, node: DomNode) => void;
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
        this.titleContainer = el("span.title", this.titleText = options.title),
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

  public set title(title: string) {
    if (this.titleContainer !== undefined) {
      this.titleContainer.text = title;
    } else {
      this.append(this.titleContainer = el("span.title", title));
    }
    this.titleText = title;
  }

  public disable(): void {
    this.addClass("disabled");
  }

  public enable(): void {
    this.deleteClass("disabled");
  }
}
