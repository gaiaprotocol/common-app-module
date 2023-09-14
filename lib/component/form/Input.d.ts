import Component from "../Component.js";
export default class Input extends Component {
    private input;
    private previousValue;
    constructor(options: {
        tag?: string;
        label: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        multiline?: boolean;
    });
    get value(): string;
    set value(value: string);
    private active;
    private inactive;
}
//# sourceMappingURL=Input.d.ts.map