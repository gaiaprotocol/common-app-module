import DomNode from "../dom/DomNode.js";

class AvatarUtil {
  public NOT_FOUND_USER_IMAGE = "/images/unknown-user.png";
  private cached: Record<string, boolean> = {};

  public async selectLoadable(
    target: DomNode,
    images: (string | undefined)[],
  ) {
    for (const image of images) {
      if (image && this.cached[image]) {
        target.style({ backgroundImage: `url('${image}')` });
      }
    }
    for (const image of images) {
      if (image) {
        try {
          const response = await fetch(image, { method: "HEAD" });
          if (response.ok && !target.deleted) {
            const img = new Image();
            img.onload = () => {
              if (!target.deleted) {
                target.style({ backgroundImage: `url('${image}')` });
              }
              this.cached[image] = true;
            };
            img.onerror = () => {
              if (!target.deleted) {
                target.style({
                  backgroundImage: `url('${this.NOT_FOUND_USER_IMAGE}')`,
                });
              }
            };
            img.src = image;
            return;
          }
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }
    if (!target.deleted) {
      target.style({
        backgroundImage: `url('${this.NOT_FOUND_USER_IMAGE}')`,
      });
    }
    console.warn("No valid images found");
  }
}

export default new AvatarUtil();
