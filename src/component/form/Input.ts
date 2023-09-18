import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";

export default class Input extends Component {
  private input: DomNode<HTMLInputElement> | DomNode<HTMLTextAreaElement>;
  private previousValue: string = "";

  constructor(options: {
    tag?: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    multiline?: boolean;
    value?: string;
  }) {
    super(
      "fieldset.input" + (options.disabled === true ? ".disabled" : "") +
        (options.required === true ? ".required" : "") +
        (options.tag ?? ""),
    );
    this.append(
      el("legend", options.label),
      this.input = el(options.multiline === true ? "textarea" : "input", {
        placeholder: options.placeholder,
        disabled: options.disabled === true ? "disabled" : undefined,
        focus: () => this.active(),
        blur: () => this.inactive(),
        keyup: () => {
          if (this.value !== this.previousValue) {
            this.fireEvent("change");
            this.previousValue = this.value;
          }
        },
      }) as any,
    );
    if (options.value !== undefined) {
      this.value = options.value;
    }
  }

  public get value(): string {
    return this.input.domElement.value;
  }

  public set value(value: string) {
    if (this.input.domElement.value !== value) {
      this.input.domElement.value = value;
      this.fireEvent("change");
    }
  }

  private active() {
    this.addClass("active");
  }

  private inactive() {
    this.deleteClass("active");
  }
}
