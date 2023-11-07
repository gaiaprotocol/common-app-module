import Component from "../Component.js";

export default class FileDropArea<EL extends HTMLElement = HTMLElement>
  extends Component<EL> {
  constructor(tag: string, onDrop: (files: File[]) => void) {
    super(tag + ".file-drop-area");

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
