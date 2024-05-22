import Component from "../Component.js";
import TweetDisplay from "./TweetDisplay.js";
import YoutubeVideoDisplay from "./YoutubeVideoDisplay.js";
export default class EmbedDisplay extends Component {
    constructor(url) {
        super(".embed-display");
        if (url.includes("x.com") || url.includes("twitter.com")) {
            this.append(new TweetDisplay(url));
        }
        else if (url.includes("youtube.com")) {
            this.append(new YoutubeVideoDisplay(url));
        }
    }
}
//# sourceMappingURL=EmbedDisplay.js.map