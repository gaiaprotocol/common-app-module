import Component from "../Component.js";

export default class FileDropArea extends Component {
  constructor(
    options: { tag: string; contenteditable?: boolean; placeholder?: string },
    onDrop: (files: File[]) => void,
  ) {
    super(options.tag + ".file-drop-area");
    if (options.contenteditable) {
      this.domElement.contentEditable = "true";
      if (options.placeholder) {
        this.domElement.setAttribute("placeholder", options.placeholder);
      }
      this.onDom("paste", (e: ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData?.getData("text/plain");
        document.execCommand("insertText", false, text);
      });
    }

    this.onDom("dragenter", (event: DragEvent) => {
      event.preventDefault();
      this.highlight();
    });

    this.onDom("dragover", (event: DragEvent) => {
      event.preventDefault();
      event.dataTransfer!.dropEffect = "copy";
      this.highlight();
    });

    this.onDom("dragleave", () => this.unhighlight());

    this.onDom("drop", (event: DragEvent) => {
      event.preventDefault();
      onDrop(Array.from(event.dataTransfer!.files));
      this.unhighlight();
    });
  }

  private highlight() {
    this.addClass("highlight");
  }

  private unhighlight() {
    this.deleteClass("highlight");
  }
}
