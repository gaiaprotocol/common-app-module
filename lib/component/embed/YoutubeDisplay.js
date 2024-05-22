import ThemeManager from "../../theme/ThemeManager.js";
import Component from "../Component.js";
import LoadingContent from "../loading/LoadingContent.js";
export default class TweetDisplay extends Component {
    constructor(url) {
        super(".tweet-display");
        const tweetId = url.split("/").pop();
        const loading = new LoadingContent().appendTo(this);
        window.twttr.widgets.createTweet(tweetId, this.domElement, { theme: ThemeManager.showingTheme }).then(() => {
            if (!this.deleted)
                loading.delete();
        });
    }
}
//# sourceMappingURL=YoutubeDisplay.js.map