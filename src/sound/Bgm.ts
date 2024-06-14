import Sound from "./Sound.js";

export default class Bgm extends Sound {
  constructor(srcs: { ogg?: string; mp3?: string }, volume = 0.8) {
    super(srcs, true, volume);
  }
}
