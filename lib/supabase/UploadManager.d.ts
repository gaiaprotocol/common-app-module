declare class UploadManager {
    private uploadFile;
    createSignedUrl(bucketId: string, path: string, expiresIn: number): Promise<string>;
    uploadImage(bucketId: string, folderPath: string, file: File, expiresIn: number): Promise<string>;
}
declare const _default: UploadManager;
export default _default;
//# sourceMappingURL=UploadManager.d.ts.map