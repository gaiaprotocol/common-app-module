import DomNode from "./DomNode.js";
export default class ResponsiveImage extends DomNode {
    static SUPPORTED_FORMATS = [".png", ".jpg", ".jpeg"];
    constructor(tag, src) {
        super(tag);
        this.src = src;
    }
    set src(src) {
        this.domElement.src = src;
        for (const format of ResponsiveImage.SUPPORTED_FORMATS) {
            const index = src.lastIndexOf(format);
            if (index !== -1) {
                const path = src.substring(0, index);
                this.domElement.srcset = `${path}@2x${format} 2x, ${path}@3x${format} 3x`;
                break;
            }
        }
    }
}
//# sourceMappingURL=ResponsiveImage.js.map