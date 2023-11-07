const isEqualMetadata = (a, b) => {
    return true;
};
export const isEqualUserPublic = (a, b) => a.user_id === b.user_id &&
    a.display_name === b.display_name &&
    a.profile_image === b.profile_image &&
    a.profile_image_thumbnail === b.profile_image_thumbnail &&
    isEqualMetadata(a.metadata ?? {}, b.metadata ?? {}) &&
    a.blocked === b.blocked;
//# sourceMappingURL=UserPublic.js.map