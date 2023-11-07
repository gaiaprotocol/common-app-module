import DomNode from "../../dom/DomNode.js";
import Component from "../Component.js";
export default abstract class UploadForm extends Component {
    protected toUploadFiles: File[];
    protected uploadPreviewArea: DomNode | undefined;
    private uploadInput;
    protected openFileSelector(): void;
    protected appendFiles(files: File[]): void;
    private appendPreview;
}
//# sourceMappingURL=UploadForm.d.ts.map