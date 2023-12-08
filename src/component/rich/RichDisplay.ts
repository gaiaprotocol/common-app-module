import Rich from "../../database-interface/Rich.js";
import el from "../../dom/el.js";
import Component from "../Component.js";

export default class RichDisplay extends Component {
  constructor(rich: Rich) {
    super(".rich-display");
    if (rich.files) {
      for (const file of rich.files) {
        if (file.fileType.startsWith("image/")) {
          this.append(el(
            ".image-container",
            el(
              "a",
              el("img", {
                src: file.url,
                alt: file.fileName,
              }),
              { click: () => this.openImage(file) },
            ),
          ));
        }
      }
    }
  }

  private openImage(file: { url: string; fileName: string }) {
    window.open(file.url, "_blank");
    //TODO:
  }
}
