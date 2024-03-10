import MaterialIcon from "../component/MaterialIcon.js";
import Button from "../component/button/Button.js";
import FileDropArea from "../component/rich/FileDropArea.js";
import UploadForm from "../component/rich/UploadForm.js";
import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import ImageCompressor from "../util/ImageCompressor.js";
import View from "../view/View.js";
class TestUploadForm extends UploadForm {
    input;
    constructor() {
        super(".test-upload-form");
        this.append(el("form", this.input = new FileDropArea({ tag: ".file-drop-area" }, (files) => this.appendFiles(files)), this.uploadPreviewArea = el(".upload-preview-area")), el("footer", el("section.rich", el("button", new MaterialIcon("image"), {
            click: () => this.openFileSelector(),
        })), new Button({
            title: "Compress",
            click: async () => {
                const file = this.toUploadFiles[0];
                if (file) {
                    const compressed = await ImageCompressor.compress(file, 1024, 1024);
                    this.append(el("img", { src: URL.createObjectURL(compressed) }));
                }
            },
        })));
    }
}
export default class ImageCompressorTestView extends View {
    constructor() {
        super();
        BodyNode.append(this.container = el(".image-compressor-test-view.test-view", new TestUploadForm()));
    }
}
//# sourceMappingURL=ImageCompressorTestView.js.map