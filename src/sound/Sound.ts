import AudioBufferManager from "./AudioBufferManager.js";

export default class Sound {
  private src: string | undefined;
  private playing = false;

  private audioBuffer: AudioBuffer | undefined;
  private audioContext: AudioContext | undefined;
  private gainNode: GainNode | undefined;
  private source: AudioBufferSourceNode | undefined;

  constructor(
    srcs: { ogg?: string; mp3?: string; wav?: string },
    private loop = false,
    private volume = 0.8,
  ) {
    if (srcs.ogg && AudioBufferManager.canPlayOgg) this.src = srcs.ogg;
    else if (srcs.mp3) this.src = srcs.mp3;
    else this.src = srcs.wav;
    if (this.src) AudioBufferManager.loadBuffer(this.src);
  }

  private async playBuffer() {
    if (this.src) {
      if (!this.audioBuffer) {
        this.audioBuffer = await AudioBufferManager.loadBuffer(this.src);
      }
      if (!this.playing) return;
      if (!this.audioContext) {
        this.audioContext = await AudioBufferManager.getAudioContext();
      }
      if (!this.playing) return;
      if (!this.gainNode) {
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = this.volume;
        this.gainNode.connect(this.audioContext.destination);
      }
      if (!this.source) {
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.audioBuffer;
        this.source.loop = this.loop;
        this.source.connect(this.gainNode);
        this.source.start();
      }
    }
  }

  public play() {
    this.playing = true;
    this.playBuffer();
    return this;
  }

  public stop() {
    this.playing = false;
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
      this.source = undefined;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = undefined;
    }
    return this;
  }
}
