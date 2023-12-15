interface UserPublicMetadata {}

export default interface UserPublic {
  user_id: string;
  display_name?: string;
  profile_image?: string;
  profile_image_thumbnail?: string;
  stored_profile_image?: string;
  stored_profile_image_thumbnail?: string;
  metadata?: UserPublicMetadata;
  blocked: boolean;
  created_at: string;
  updated_at?: string;
}
