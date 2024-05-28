import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import ImageCompressor from "../../util/ImageCompressor.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";

export default abstract class UploadForm extends Component {
  protected toUploadFiles: File[] = [];
  protected uploadPreviewArea: DomNode | undefined;

  constructor(tag: string) {
    super(tag + ".upload-form");
  }

  private uploadInput = el<HTMLInputElement>("input.upload", {
    type: "file",
    multiple: true,
    change: () => {
      const files = this.uploadInput.domElement.files;
      if (files) this.appendFiles(Array.from(files));
      this.uploadInput.domElement.value = "";
    },
  });

  protected openFileSelector() {
    this.uploadInput.domElement.click();
  }

  protected async appendFiles(files: File[]) {
    for (const file of files) {
      const compressed = await ImageCompressor.compress(file, 1024, 1024);
      this.toUploadFiles.push(compressed);
      this.appendPreview(compressed);
    }
  }

  protected abstract deleteFileHandler(file: File): void;

  private appendPreview(file: File) {
    if (this.uploadPreviewArea) {
      const preview = el(
        "a.preview",
        el("button.x", new MaterialIcon("close"), {
          click: (event) => {
            event.preventDefault();
            this.toUploadFiles = this.toUploadFiles.filter(
              (f) => f !== file,
            );
            preview.delete();
            this.deleteFileHandler(file);
          },
        }),
        {
          href: URL.createObjectURL(file),
          download: file.name,
          target: "_blank",
        },
      ).appendTo(this.uploadPreviewArea);

      if (file.type.startsWith("image/")) {
        preview.addClass("image").style({
          backgroundImage: `url(${URL.createObjectURL(file)})`,
        });
      } else {
        preview.addClass("file").append(file.name);
      }
    }
  }

  protected clearUploads() {
    this.toUploadFiles = [];
    this.uploadPreviewArea?.empty();
  }
}
