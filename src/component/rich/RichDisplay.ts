import Rich from "../../database-interface/Rich.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import LoadingSpinner from "../loading/LoadingSpinner.js";

export default class RichDisplay extends Component {
  public static NOT_FOUND_IMAGE = "/images/image-not-found.png";
  private static cached: Record<string, boolean> = {};

  private uploadingSpinners: LoadingSpinner[] = [];

  constructor(rich: Rich, uploading: boolean) {
    super(".rich-display");
    this.addAllowedEvents("imageLoaded");

    if (rich.files) {
      for (const file of rich.files) {
        if (file.fileType.startsWith("image/")) {
          let imageNotFound = false;

          const cached = RichDisplay.cached[file.url];
          const loadingSpinner = new LoadingSpinner();
          const imageContainer = el(
            ".image-container" + (!cached ? ".loading" : ""),
            !cached ? loadingSpinner : undefined,
          ).appendTo(this);

          const image = el<HTMLImageElement>(
            "img" + (!cached ? ".hidden" : ""),
            {
              src: file.url,
              alt: file.fileName,
              load: () => {
                RichDisplay.cached[file.url] = true;
                if (!this.deleted) {
                  image.deleteClass("hidden");
                  this.emit("imageLoaded", image.domElement.height);
                  if (!loadingSpinner.deleted) loadingSpinner.delete();
                  imageContainer.deleteClass("loading");
                }
              },
            },
          );

          image.domElement.onerror = () => {
            image.deleteClass("hidden");
            image.domElement.onerror = null;
            image.domElement.src = RichDisplay.NOT_FOUND_IMAGE;
            imageNotFound = true;
            if (!loadingSpinner.deleted) loadingSpinner.delete();
            imageContainer.deleteClass("loading");
          };

          let uploadingSpinner: LoadingSpinner | undefined;

          imageContainer.append(el("a", image, {
            click: (event) => {
              event.stopPropagation();
              if (!imageNotFound) this.openImage(file.url, file.fileName);
            },
          }, uploading ? uploadingSpinner = new LoadingSpinner() : undefined));

          if (uploadingSpinner) this.uploadingSpinners.push(uploadingSpinner);
        }
      }
    }

    if (rich.gif) {
      let imageNotFound = false;

      const cached = RichDisplay.cached[rich.gif];
      const loadingSpinner = new LoadingSpinner();
      const imageContainer = el(
        ".image-container" + (!cached ? ".loading" : ""),
        !cached ? loadingSpinner : undefined,
      ).appendTo(this);

      const image = el<HTMLImageElement>(
        "img" + (!cached ? ".hidden" : ""),
        {
          src: rich.gif,
          load: () => {
            RichDisplay.cached[rich.gif!] = true;
            if (!this.deleted) {
              image.deleteClass("hidden");
              if (!loadingSpinner.deleted) loadingSpinner.delete();
              imageContainer.deleteClass("loading");
              this.emit("imageLoaded", image.domElement.height);
            }
          },
        },
      );

      image.domElement.onerror = () => {
        image.deleteClass("hidden");
        image.domElement.onerror = null;
        image.domElement.src = RichDisplay.NOT_FOUND_IMAGE;
        imageNotFound = true;
        if (!loadingSpinner.deleted) loadingSpinner.delete();
        imageContainer.deleteClass("loading");
      };

      imageContainer.append(el("a", image, {
        click: (event) => {
          event.stopPropagation();
          if (!imageNotFound) this.openImage(rich.gif!, "Gif File");
        },
      }));
    }
  }

  private openImage(url: string, fileName: string) {
    window.open(url, "_blank");
    //TODO:
  }

  public uploadDone() {
    for (const spinner of this.uploadingSpinners) {
      spinner.delete();
    }
  }
}
