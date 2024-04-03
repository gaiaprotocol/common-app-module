import Constants from "../Constants.js";
import Supabase from "../supabase/Supabase.js";
import SupabaseService from "../supabase/SupabaseService.js";
export default class UserService extends SupabaseService {
    async fetchUser(userId) {
        return await this.safeSelectSingle((b) => b.eq("user_id", userId));
    }
    async fetchNewUsers(lastCreatedAt) {
        return await this.safeSelect((b) => b.order("created_at", { ascending: false }).gt("created_at", lastCreatedAt ?? Constants.UNIX_EPOCH_START_DATE));
    }
    async findUsers(query, lastCreatedAt) {
        return await this.safeSelect((b) => b.or(`display_name.ilike.%${query}%`).gt("created_at", lastCreatedAt ?? Constants.UNIX_EPOCH_START_DATE));
    }
    async fetchFollowingUsers(userId, lastFetchedFollowedAt) {
        const { data, error } = await Supabase.client.rpc("get_following_users", {
            p_user_id: userId,
            last_fetched_followed_at: lastFetchedFollowedAt,
            max_count: this.fetchLimit,
        });
        if (error)
            throw error;
        if (data && data.length > 0) {
            lastFetchedFollowedAt = data[data.length - 1].followed_at;
        }
        return {
            users: Supabase.safeResult(data ?? []),
            lastFetchedFollowedAt,
        };
    }
    async fetchFollowers(userId, lastFetchedFollowedAt) {
        const { data, error } = await Supabase.client.rpc("get_followers", {
            p_user_id: userId,
            last_fetched_followed_at: lastFetchedFollowedAt,
            max_count: this.fetchLimit,
        });
        if (error)
            throw error;
        if (data && data.length > 0) {
            lastFetchedFollowedAt = data[data.length - 1].followed_at;
        }
        return {
            users: Supabase.safeResult(data ?? []),
            lastFetchedFollowedAt,
        };
    }
}
//# sourceMappingURL=UserService.js.map