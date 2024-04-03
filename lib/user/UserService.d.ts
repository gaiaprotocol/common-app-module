import UserPublic from "../database-interface/UserPublic.js";
import SupabaseService from "../supabase/SupabaseService.js";
export default abstract class UserService<T extends UserPublic> extends SupabaseService<T> {
    fetchUser(userId: string): Promise<T | undefined>;
    fetchNewUsers(lastCreatedAt: string | undefined): Promise<T[]>;
    findUsers(query: string, lastCreatedAt: string | undefined): Promise<T[]>;
    fetchFollowingUsers(userId: string, lastFetchedFollowedAt: string | undefined): Promise<{
        users: T[];
        lastFetchedFollowedAt: string | undefined;
    }>;
    fetchFollowers(userId: string, lastFetchedFollowedAt: string | undefined): Promise<{
        users: T[];
        lastFetchedFollowedAt: string | undefined;
    }>;
}
//# sourceMappingURL=UserService.d.ts.map