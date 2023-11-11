export interface UploadedFile {
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export default interface Rich {
  files?: UploadedFile[];
}

export const isEqualRich = (a: Rich, b: Rich) =>
  a.files?.length === b.files?.length && (
    a.files?.every((file, index) => {
      const otherFile = b.files?.[index];
      return file.url === otherFile?.url &&
        file.fileName === otherFile?.fileName &&
        file.fileType === otherFile?.fileType &&
        file.fileSize === otherFile?.fileSize;
    }) ?? false
  );
