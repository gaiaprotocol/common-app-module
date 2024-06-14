const _audioContext = new AudioContext();
window.addEventListener("mousedown", () => _audioContext.resume());

class AudioBufferManager {
  public canPlayOgg = new Audio().canPlayType("audio/ogg") !== "";

  private buffers: { [src: string]: AudioBuffer } = {};
  private loadingPromises: { [src: string]: Promise<AudioBuffer> } = {};

  public async getAudioContext() {
    if (_audioContext.state === "suspended") await _audioContext.resume();
    return _audioContext;
  }

  public async loadBuffer(src: string) {
    if (this.buffers[src]) {
      return this.buffers[src];
    }

    if (!this.loadingPromises[src]) {
      this.loadingPromises[src] = (async () => {
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = await this.getAudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        this.buffers[src] = audioBuffer;
        delete this.loadingPromises[src];
        return audioBuffer;
      })();
    }

    return this.loadingPromises[src];
  }
}

export default new AudioBufferManager();
