import el from "../../dom/el.js";
import ImageCompressor from "../../util/ImageCompressor.js";
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
    async appendFiles(files) {
        for (const file of files) {
            const compressed = await ImageCompressor.compress(file, 1024, 1024);
            this.toUploadFiles.push(compressed);
            this.appendPreview(compressed);
        }
    }
    appendPreview(file) {
        if (this.uploadPreviewArea) {
            const preview = el("a.preview", el("button.x", new Icon("x"), {
                click: (event) => {
                    event.preventDefault();
                    this.toUploadFiles = this.toUploadFiles.filter((f) => f !== file);
                    preview.delete();
                },
            }), {
                href: URL.createObjectURL(file),
                download: file.name,
                target: "_blank",
            }).appendTo(this.uploadPreviewArea);
            if (file.type.startsWith("image/")) {
                preview.addClass("image").style({
                    backgroundImage: `url(${URL.createObjectURL(file)})`,
                });
            }
            else {
                preview.addClass("file").append(file.name);
            }
        }
    }
    clearUploads() {
        this.toUploadFiles = [];
        this.uploadPreviewArea?.empty();
    }
}
//# sourceMappingURL=UploadForm.js.map