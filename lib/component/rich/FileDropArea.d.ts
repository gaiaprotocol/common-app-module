import Component from "../Component.js";
export default class FileDropArea<EL extends HTMLElement = HTMLElement> extends Component<EL> {
    constructor(options: {
        tag: string;
        contenteditable: boolean;
    }, onDrop: (files: File[]) => void);
    private highlight;
    private unhighlight;
    get value(): string;
    set value(value: string);
}
//# sourceMappingURL=FileDropArea.d.ts.map