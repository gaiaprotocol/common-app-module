import el from "../../dom/el.js";
import Component from "../Component.js";
import LoadingSpinner from "../loading/LoadingSpinner.js";
export default class RichDisplay extends Component {
    static NOT_FOUND_IMAGE = "/images/image-not-found.png";
    uploadingSpinners = [];
    constructor(rich, uploading) {
        super(".rich-display");
        this.addAllowedEvents("imageLoaded");
        if (rich.files) {
            for (const file of rich.files) {
                if (file.fileType.startsWith("image/")) {
                    let imageNotFound = false;
                    const loadingSpinner = new LoadingSpinner();
                    const imageContainer = el(".image-container.loading", loadingSpinner)
                        .appendTo(this);
                    const image = el("img.hidden", {
                        src: file.url,
                        alt: file.fileName,
                        load: () => {
                            if (!this.deleted) {
                                image.deleteClass("hidden");
                                this.fireEvent("imageLoaded", image.domElement.height);
                                if (!loadingSpinner.deleted)
                                    loadingSpinner.delete();
                                imageContainer.deleteClass("loading");
                            }
                        },
                    });
                    image.domElement.onerror = () => {
                        image.deleteClass("hidden");
                        image.domElement.onerror = null;
                        image.domElement.src = RichDisplay.NOT_FOUND_IMAGE;
                        imageNotFound = true;
                        if (!loadingSpinner.deleted)
                            loadingSpinner.delete();
                        imageContainer.deleteClass("loading");
                    };
                    let uploadingSpinner;
                    imageContainer.append(el("a", image, {
                        click: (event) => {
                            event.stopPropagation();
                            if (!imageNotFound)
                                this.openImage(file);
                        },
                    }, uploading ? uploadingSpinner = new LoadingSpinner() : undefined));
                    if (uploadingSpinner)
                        this.uploadingSpinners.push(uploadingSpinner);
                }
            }
        }
    }
    openImage(file) {
        window.open(file.url, "_blank");
    }
    uploadDone() {
        for (const spinner of this.uploadingSpinners) {
            spinner.delete();
        }
    }
}
//# sourceMappingURL=RichDisplay.js.map