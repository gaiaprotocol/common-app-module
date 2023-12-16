import el from "../../dom/el.js";
import Component from "../Component.js";
export default class RichDisplay extends Component {
    static NOT_FOUND_IMAGE = "/images/image-not-found.png";
    constructor(rich) {
        super(".rich-display");
        this.addAllowedEvents("imageLoaded");
        if (rich.files) {
            for (const file of rich.files) {
                if (file.fileType.startsWith("image/")) {
                    let imageNotFound = false;
                    const image = el("img", {
                        src: file.url,
                        alt: file.fileName,
                        load: (event, image) => {
                            if (!this.deleted) {
                                this.fireEvent("imageLoaded", image.domElement.height);
                            }
                        },
                    });
                    image.domElement.onerror = () => {
                        image.domElement.onerror = null;
                        image.domElement.src = RichDisplay.NOT_FOUND_IMAGE;
                        imageNotFound = true;
                    };
                    this.append(el(".image-container", el("a", image, {
                        click: (event) => {
                            event.stopPropagation();
                            if (!imageNotFound)
                                this.openImage(file);
                        },
                    })));
                }
            }
        }
    }
    openImage(file) {
        window.open(file.url, "_blank");
    }
}
//# sourceMappingURL=RichDisplay.js.map