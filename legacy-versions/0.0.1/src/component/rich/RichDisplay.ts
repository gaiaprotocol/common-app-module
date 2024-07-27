import Rich from "../../database-interface/Rich.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import LottieAnimation from "../LottieAnimation.js";
import LoadingSpinner from "../loading/LoadingSpinner.js";
import imageLoadingAnimationData from "./image-loading-animation.json" assert {
  type: "json",
};

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

          const loading = new LottieAnimation(
            ".image-loading-animation",
            imageLoadingAnimationData,
          );

          const image = el<HTMLImageElement>("img.hidden", {
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

          let loadingSpinner: LoadingSpinner | undefined;

          this.append(el(
            ".image-container",
            el(
              "a",
              image,
              loading,
              {
                click: (event) => {
                  event.stopPropagation();
                  if (!imageNotFound) this.openImage(file);
                },
              },
            ),
            wait ? loadingSpinner = new LoadingSpinner() : undefined,
          ));

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
