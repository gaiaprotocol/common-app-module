import el from "../../dom/el.js";
import Component from "../Component.js";
import Icon from "../Icon.js";
export default class UploadForm extends Component {
    toUploadFiles = [];
    uploadPreviewArea;
    constructor(tag) {
        super(tag + ".upload-form");
    }
    uploadInput = el("input.upload", {
        type: "file",
        multiple: true,
        change: () => {
            const files = this.uploadInput.domElement.files;
            if (files)
                this.appendFiles(Array.from(files));
            this.uploadInput.domElement.value = "";
        },
    });
    openFileSelector() {
        this.uploadInput.domElement.click();
    }
    appendFiles(files) {
        this.toUploadFiles.push(...files);
        for (const file of files) {
            this.appendPreview(file);
        }
    }
    appendPreview(file) {
        if (this.uploadPreviewArea) {
            const preview = el(".preview", el("button", new Icon("x"), {
                click: () => {
                    this.toUploadFiles = this.toUploadFiles.filter((f) => f !== file);
                    preview.delete();
                },
            })).appendTo(this.uploadPreviewArea);
            if (file.type.startsWith("image/")) {
                preview.addClass("image").append(el(".preview.image", el("img", {
                    src: URL.createObjectURL(file),
                })));
            }
            else {
                preview.addClass("file").append(el(".preview.file", el("a", file.name, { href: URL.createObjectURL(file) }, { click: () => URL.revokeObjectURL(file.name) })));
            }
        }
    }
    clearUploads() {
        this.toUploadFiles = [];
        this.uploadPreviewArea?.empty();
    }
}
//# sourceMappingURL=UploadForm.js.map