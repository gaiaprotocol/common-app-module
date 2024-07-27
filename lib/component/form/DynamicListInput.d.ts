import Component from "../Component.js";
interface DynamicListInputOptions {
    label: string;
    schema: {
        key: string;
        title: string;
        type?: string;
        required?: boolean;
    }[];
}
export default class DynamicListInput extends Component {
    private options;
    private tbody;
    constructor(options: DynamicListInputOptions, initialValues?: any[]);
    private addItem;
    get value(): any;
}
export {};
//# sourceMappingURL=DynamicListInput.d.ts.map