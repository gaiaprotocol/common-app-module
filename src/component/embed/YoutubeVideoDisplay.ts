import el from "../../dom/el.js";
import Component from "../Component.js";

export default class YoutubeVideoDisplay extends Component {
  constructor(url: string) {
    super(".youtube-video-display");
    const videoId = url.split("v=").pop();
    el("iframe", {
      src: `https://www.youtube.com/embed/${videoId}`,
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: true,
      frameborder: 0,
    }).appendTo(this);
  }
}
