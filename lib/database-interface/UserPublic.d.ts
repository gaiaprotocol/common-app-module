interface UserPublicMetadata {
}
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
export declare const isEqualUserPublic: (a: UserPublic, b: UserPublic) => boolean;
export {};
//# sourceMappingURL=UserPublic.d.ts.map