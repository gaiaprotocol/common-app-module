import Component from "../Component.js";
export default class FileDropArea extends Component {
    constructor(options, onDrop) {
        super(options.tag + ".file-drop-area");
        if (options.contenteditable) {
            this.domElement.contentEditable = "true";
            this.onDom("paste", (e) => {
                e.preventDefault();
                const text = e.clipboardData?.getData("text/plain");
                document.execCommand("insertText", false, text);
            });
        }
        this.onDom("dragenter", (event) => {
            event.preventDefault();
            this.highlight();
        });
        this.onDom("dragover", (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy";
            this.highlight();
        });
        this.onDom("dragleave", () => this.unhighlight());
        this.onDom("drop", (event) => {
            event.preventDefault();
            onDrop(Array.from(event.dataTransfer.files));
            this.unhighlight();
        });
    }
    highlight() {
        this.addClass("highlight");
    }
    unhighlight() {
        this.deleteClass("highlight");
    }
}
//# sourceMappingURL=FileDropArea.js.map