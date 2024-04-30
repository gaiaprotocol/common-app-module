import Rich from "../../database-interface/Rich.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import LoadingSpinner from "../loading/LoadingSpinner.js";

export default class RichDisplay extends Component {
  public static NOT_FOUND_IMAGE = "/images/image-not-found.png";

  private loadingSpinners: LoadingSpinner[] = [];

  constructor(rich: Rich, wait: boolean) {
    super(".rich-display");
    this.addAllowedEvents("imageLoaded");

    if (rich.files) {
      for (const file of rich.files) {
        if (file.fileType.startsWith("image/")) {
          let imageNotFound = false;

          const imageContainer = el(".image-container.loading").appendTo(this);

          const image = el<HTMLImageElement>("img.hidden", {
            src: file.url,
            alt: file.fileName,
            load: () => {
              if (!this.deleted) {
                image.deleteClass("hidden");
                this.fireEvent("imageLoaded", image.domElement.height);
                imageContainer.deleteClass("loading");
              }
            },
          });

          image.domElement.onerror = () => {
            image.deleteClass("hidden");
            image.domElement.onerror = null;
            image.domElement.src = RichDisplay.NOT_FOUND_IMAGE;
            imageNotFound = true;
            imageContainer.deleteClass("loading");
          };

          let loadingSpinner: LoadingSpinner | undefined;

          imageContainer.append(el("a", image, {
            click: (event) => {
              event.stopPropagation();
              if (!imageNotFound) this.openImage(file);
            },
          }, wait ? loadingSpinner = new LoadingSpinner() : undefined));

          if (loadingSpinner) this.loadingSpinners.push(loadingSpinner);
        }
      }
    }
  }

  private openImage(file: { url: string; fileName: string }) {
    window.open(file.url, "_blank");
    //TODO:
  }

  public done() {
    for (const loadingSpinner of this.loadingSpinners) {
      loadingSpinner.delete();
    }
  }
}
