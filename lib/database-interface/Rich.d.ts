export interface UploadedFile {
    url: string;
    fileName: string;
    fileType: string;
    fileSize: number;
}
export default interface Rich {
    files?: UploadedFile[];
}
export declare const isEqualRich: (a: Rich, b: Rich) => boolean;
//# sourceMappingURL=Rich.d.ts.map