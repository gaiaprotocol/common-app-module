import Component from "../Component.js";
export default class FileDropArea<EL extends HTMLElement = HTMLElement> extends Component<EL> {
    constructor(tag: string, onDrop: (files: File[]) => void);
    private highlight;
    private unhighlight;
}
//# sourceMappingURL=FileDropArea.d.ts.map