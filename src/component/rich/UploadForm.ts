import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import Icon from "../Icon.js";

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

  protected appendFiles(files: File[]) {
    this.toUploadFiles.push(...files);
    for (const file of files) {
      this.appendPreview(file);
    }
  }

  private appendPreview(file: File) {
    if (this.uploadPreviewArea) {
      const preview = el(
        ".preview",
        el("button", new Icon("x"), {
          click: () => {
            this.toUploadFiles = this.toUploadFiles.filter(
              (f) => f !== file,
            );
            preview.delete();
          },
        }),
      ).appendTo(this.uploadPreviewArea);

      if (file.type.startsWith("image/")) {
        preview.addClass("image").append(
          el(
            ".preview.image",
            el<HTMLImageElement>("img", {
              src: URL.createObjectURL(file),
            }),
          ),
        );
      } else {
        preview.addClass("file").append(
          el(
            ".preview.file",
            el<HTMLAnchorElement>(
              "a",
              file.name,
              { href: URL.createObjectURL(file) },
              { click: () => URL.revokeObjectURL(file.name) },
            ),
          ),
        );
      }
    }
  }

  protected clearUploads() {
    this.toUploadFiles = [];
    this.uploadPreviewArea?.empty();
  }
}
