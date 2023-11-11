export const isEqualRich = (a, b) => a.files?.length === b.files?.length && (a.files?.every((file, index) => {
    const otherFile = b.files?.[index];
    return file.url === otherFile?.url &&
        file.fileName === otherFile?.fileName &&
        file.fileType === otherFile?.fileType &&
        file.fileSize === otherFile?.fileSize;
}) ?? false);
//# sourceMappingURL=Rich.js.map