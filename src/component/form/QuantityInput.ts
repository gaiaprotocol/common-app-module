import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";

export default class QuantityInput extends Component {
  private minusButton: Button;
  private input: DomNode<HTMLInputElement>;
  private plusButton: Button;

  private previousValue: number | undefined;

  constructor(
    private options: {
      tag?: string;
      label?: string;
      disabled?: boolean;
      value?: number;
      min?: number;
      max?: number;
    },
  ) {
    super(
      ".quantity-input" + (options.disabled === true ? ".disabled" : "") +
        (options.tag ?? ""),
    );
    this.addAllowedEvents("change");

    this.append(
      el("span.label", options.label),
      el(
        "main",
        this.minusButton = new Button({
          type: ButtonType.Circle,
          icon: new MaterialIcon("remove"),
          click: () => {
            this.value--;
            this.emit("change");
          },
        }),
        this.input = el("input", {
          type: "number",
          disabled: options.disabled === true ? "disabled" : undefined,
          min: options.min,
          max: options.max,
          keyup: () => {
            if (this.value !== this.previousValue) {
              this.emit("change");
              this.previousValue = this.value;
            }
          },
          change: () => {
            if (this.value !== this.previousValue) {
              this.emit("change");
              this.previousValue = this.value;
            }
          },
        }) as any,
        this.plusButton = new Button({
          type: ButtonType.Circle,
          icon: new MaterialIcon("add"),
          click: () => {
            this.value++;
            this.emit("change");
          },
        }),
      ),
    );

    if (options.value !== undefined) this.value = options.value;
  }

  public get value(): number {
    return parseInt(this.input.domElement.value);
  }

  public set value(value: number) {
    if (parseInt(this.input.domElement.value) === value) return;
    this.input.domElement.value = String(value);
    this.emit("change");

    if (value === this.options.min) this.minusButton.disable();
    else this.minusButton.enable();
    if (value === this.options.max) this.plusButton.disable();
    else this.plusButton.enable();
  }

  public select() {
    this.input.domElement.select();
  }
}
