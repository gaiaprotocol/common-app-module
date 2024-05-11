class AvatarUtil {
    NOT_FOUND_USER_IMAGE = "/images/unknown-user.png";
    cached = {};
    async selectLoadable(target, images) {
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
                            target.style({ backgroundImage: `url('${image}')` });
                            this.cached[image] = true;
                        };
                        img.onerror = () => target.style({
                            backgroundImage: `url('${this.NOT_FOUND_USER_IMAGE}')`,
                        });
                        img.src = image;
                        return;
                    }
                }
                catch (error) {
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
//# sourceMappingURL=AvatarUtil.js.map