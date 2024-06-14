declare class AudioBufferManager {
    canPlayOgg: boolean;
    private buffers;
    private loadingPromises;
    getAudioContext(): Promise<AudioContext>;
    loadBuffer(src: string): Promise<AudioBuffer>;
}
declare const _default: AudioBufferManager;
export default _default;
//# sourceMappingURL=AudioBufferManager.d.ts.map