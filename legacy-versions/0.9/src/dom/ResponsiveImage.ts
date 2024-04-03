import DomNode from "./DomNode.js";

export default class ResponsiveImage extends DomNode<HTMLImageElement> {
  private static readonly SUPPORTED_FORMATS = [".png", ".jpg", ".jpeg"]; // Add more if needed

  constructor(tag: string, src: string) {
    super(tag);
    this.src = src;
  }

  public set src(src: string) {
    this.domElement.src = src;
    for (const format of ResponsiveImage.SUPPORTED_FORMATS) {
      const index = src.lastIndexOf(format);
      if (index !== -1) {
        const path = src.substring(0, index);
        this.domElement.srcset =
          `${path}@2x${format} 2x, ${path}@3x${format} 3x`;
        break;
      }
    }
  }
}
