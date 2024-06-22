import Sound from "./Sound.js";

export default class Bgm extends Sound {
  constructor(srcs: { ogg?: string; mp3?: string }, volume = 0.8) {
    super(srcs, true, volume);
    document.addEventListener(
      "visibilitychange",
      this.visibilityChangeListener,
    );
  }

  private visibilityChangeListener = () => {
    if (document.hidden) {
      this.pause();
    } else {
      this.play();
    }
  };

  public delete() {
    document.removeEventListener(
      "visibilitychange",
      this.visibilityChangeListener,
    );
    super.delete();
  }
}
