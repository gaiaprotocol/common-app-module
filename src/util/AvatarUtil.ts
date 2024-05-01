import DomNode from "../dom/DomNode.js";

export default class AvatarUtil {
  public static NOT_FOUND_USER_IMAGE = "/images/unknown-user.png";

  public static async selectLoadable(
    target: DomNode,
    images: (string | undefined)[],
  ) {
    for (const image of images) {
      if (image) {
        try {
          const response = await fetch(image, { method: "HEAD" });
          if (response.ok && !target.deleted) {
            const img = new Image();
            img.onload = () =>
              target.style({ backgroundImage: `url('${image}')` });
            img.onerror = () =>
              target.style({
                backgroundImage: `url('${AvatarUtil.NOT_FOUND_USER_IMAGE}')`,
              });
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
        backgroundImage: `url('${AvatarUtil.NOT_FOUND_USER_IMAGE}')`,
      });
    }
    console.warn("No valid images found");
  }
}
