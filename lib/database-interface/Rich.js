export const isEqualRich = (a, b) => a.files?.length === b.files?.length && (a.files?.every((file, index) => {
    const otherFile = b.files?.[index];
    return (file.url ?? undefined) === (otherFile?.url ?? undefined) &&
        (file.fileName ?? undefined) === (otherFile?.fileName ?? undefined) &&
        (file.fileType ?? undefined) === (otherFile?.fileType ?? undefined) &&
        (file.fileSize ?? undefined) === (otherFile?.fileSize ?? undefined);
}) ?? false);
//# sourceMappingURL=Rich.js.map