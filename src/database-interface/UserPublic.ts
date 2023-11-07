interface UserPublicMetadata {}

export default interface UserPublic {
  user_id: string;
  display_name?: string;
  profile_image?: string;
  profile_image_thumbnail?: string;
  metadata?: UserPublicMetadata;
  blocked: boolean;
  created_at: string;
  updated_at?: string;
}

const isEqualMetadata = (a: UserPublicMetadata, b: UserPublicMetadata) => {
  return true;
};

export const isEqualUserPublic = (a: UserPublic, b: UserPublic) =>
  a.user_id === b.user_id &&
  a.display_name === b.display_name &&
  a.profile_image === b.profile_image &&
  a.profile_image_thumbnail === b.profile_image_thumbnail &&
  isEqualMetadata(a.metadata ?? {}, b.metadata ?? {}) &&
  a.blocked === b.blocked;
