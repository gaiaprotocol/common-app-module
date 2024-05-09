import Component from "../Component.js";
export default class QuantityInput extends Component {
    private options;
    private minusButton;
    private input;
    private plusButton;
    private previousValue;
    constructor(options: {
        tag?: string;
        label?: string;
        disabled?: boolean;
        value?: number;
        min?: number;
        max?: number;
    });
    get value(): number;
    set value(value: number);
    select(): void;
}
//# sourceMappingURL=QuantityInput.d.ts.map