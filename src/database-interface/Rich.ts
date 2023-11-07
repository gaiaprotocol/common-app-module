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
      return (file.url ?? undefined) === (otherFile?.url ?? undefined) &&
        (file.fileName ?? undefined) === (otherFile?.fileName ?? undefined) &&
        (file.fileType ?? undefined) === (otherFile?.fileType ?? undefined) &&
        (file.fileSize ?? undefined) === (otherFile?.fileSize ?? undefined);
    }) ?? false
  );
