import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";

export default class Select<VT = string> extends Component {
  private _value: VT | undefined;
  private _options: { dom: DomNode; value: VT }[] = [];

  private valueDisplay: DomNode;
  private optionContainer: DomNode;

  constructor(
    private o: {
      placeholder?: string;
      options: { dom: DomNode; value: VT }[];
      defaultValue?: VT;
    },
  ) {
    super(".select");
    this.addAllowedEvents("change");

    this.append(
      this.valueDisplay = el(".value"),
      this.optionContainer = el(".option-container"),
    );

    if (o.placeholder) {
      this.valueDisplay.domElement.setAttribute(
        "data-empty-message",
        o.placeholder,
      );
    }

    this.onDom("mousedown", (event) => {
      event.stopPropagation();
      this.toggleClass("open");
    });

    this.onWindow("mousedown", () => this.deleteClass("open"));

    this.options = o.options;
  }

  public get value() {
    return this._value;
  }

  public set value(value: VT | undefined) {
    if (this._value === value) return;

    this.valueDisplay.empty();
    const optionDom = this._options.find((option) => option.value === value)
      ?.dom.clone();
    if (optionDom) this.valueDisplay.append(optionDom);

    if (optionDom || value === undefined) {
      this._value = value;
      this.fireEvent("change", value);
    }
  }

  public get options() {
    return this._options;
  }

  public set options(options: { dom: DomNode; value: VT }[]) {
    this._options = options;

    this.optionContainer.empty();
    for (const option of options) {
      option.dom.clone().appendTo(this.optionContainer).onDom(
        "mousedown",
        () => this.value = option.value,
      );
    }

    this.value = this._value;
  }
}
