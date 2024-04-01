import el from "../../dom/el.js";
import Component from "../Component.js";
import LottieAnimation from "../LottieAnimation.js";
import LoadingSpinner from "../loading/LoadingSpinner.js";
import imageLoadingAnimationData from "./image-loading-animation.json" assert {
    type: "json"
};
export default class RichDisplay extends Component {
    static NOT_FOUND_IMAGE = "/images/image-not-found.png";
    loadingSpinners = [];
    constructor(rich, wait) {
        super(".rich-display");
        this.addAllowedEvents("imageLoaded");
        if (rich.files) {
            for (const file of rich.files) {
                if (file.fileType.startsWith("image/")) {
                    let imageNotFound = false;
                    const loading = new LottieAnimation(".image-loading-animation", imageLoadingAnimationData);
                    const image = el("img.hidden", {
                        src: file.url,
                        alt: file.fileName,
                        load: () => {
                            if (!this.deleted) {
                                image.deleteClass("hidden");
                                this.fireEvent("imageLoaded", image.domElement.height);
                                loading.delete();
                            }
                        },
                    });
                    image.domElement.onerror = () => {
                        image.deleteClass("hidden");
                        image.domElement.onerror = null;
                        image.domElement.src = RichDisplay.NOT_FOUND_IMAGE;
                        imageNotFound = true;
                        loading.delete();
                    };
                    let loadingSpinner;
                    this.append(el(".image-container", el("a", image, loading, {
                        click: (event) => {
                            event.stopPropagation();
                            if (!imageNotFound)
                                this.openImage(file);
                        },
                    }), wait ? loadingSpinner = new LoadingSpinner() : undefined));
                    if (loadingSpinner)
                        this.loadingSpinners.push(loadingSpinner);
                }
            }
        }
    }
    openImage(file) {
        window.open(file.url, "_blank");
    }
    done() {
        for (const loadingSpinner of this.loadingSpinners) {
            loadingSpinner.delete();
        }
    }
}
//# sourceMappingURL=RichDisplay.js.map