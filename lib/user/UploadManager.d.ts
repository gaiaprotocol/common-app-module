declare class UploadManager {
    private _uploadFile;
    createSignedUrl(bucketId: string, path: string, expiresIn: number): Promise<string>;
    uploadAttachment(bucketId: string, folderPath: string, file: File, expiresIn: number): Promise<string>;
    uploadFile(bucketId: string, folderPath: string, file: File): Promise<string>;
}
declare const _default: UploadManager;
export default _default;
//# sourceMappingURL=UploadManager.d.ts.map