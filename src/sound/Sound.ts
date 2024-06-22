import AudioBufferManager from "./AudioBufferManager.js";

export default class Sound {
  private src: string | undefined;
  private playing = false;
  private paused = false;

  private audioBuffer: AudioBuffer | undefined;
  private audioContext: AudioContext | undefined;
  private gainNode: GainNode | undefined;
  private source: AudioBufferSourceNode | undefined;

  private pauseTime: number = 0;
  private offset: number = 0;

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
        this.source.start(0, this.offset);
      }
    }
  }

  public play() {
    if (this.paused) {
      this.offset += this.audioContext!.currentTime - this.pauseTime;
    } else {
      this.offset = 0;
    }
    this.playing = true;
    this.paused = false;
    this.playBuffer();
    return this;
  }

  public pause() {
    if (this.playing && !this.paused) {
      this.paused = true;
      this.playing = false;
      this.pauseTime = this.audioContext!.currentTime;
      if (this.source) {
        this.source.stop();
        this.source.disconnect();
        this.source = undefined;
      }
    }
    return this;
  }

  public delete() {
    this.playing = false;
    this.paused = false;
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
      this.source = undefined;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = undefined;
    }
    this.audioBuffer = undefined;
    this.audioContext = undefined;
    this.offset = 0;
  }
}
