import DomNode from "../../dom/DomNode.js";
import Component from "../Component.js";
export default abstract class UploadForm extends Component {
    protected toUploadFiles: File[];
    protected uploadPreviewArea: DomNode | undefined;
    constructor(tag: string);
    private uploadInput;
    protected openFileSelector(): void;
    protected appendFiles(files: File[]): Promise<void>;
    protected abstract deleteFileHandler(file: File): void;
    private appendPreview;
    protected clearUploads(): void;
}
//# sourceMappingURL=UploadForm.d.ts.map