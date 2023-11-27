import Component from "../Component.js";
export default class FileDropArea extends Component {
    constructor(options: {
        tag: string;
        contenteditable: boolean;
    }, onDrop: (files: File[]) => void);
    private highlight;
    private unhighlight;
}
//# sourceMappingURL=FileDropArea.d.ts.map