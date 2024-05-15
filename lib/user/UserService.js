import Constants from "../Constants.js";
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
}
//# sourceMappingURL=UserService.js.map