declare class ImageCompressor {
    isAnimatedGif(file: File): Promise<boolean>;
    compress(file: File, width: number, height: number): Promise<File>;
}
declare const _default: ImageCompressor;
export default _default;
//# sourceMappingURL=ImageCompressor.d.ts.map