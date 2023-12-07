import SupabaseService from "./SupabaseService.js";
export default class UserService extends SupabaseService {
    async fetchUser(userId) {
        return await this.safeSelectSingle((b) => b.eq("user_id", userId));
    }
    async fetchNewUsers(lastCreatedAt) {
        return await this.safeSelect((b) => b.order("created_at", { ascending: false }).gt("created_at", lastCreatedAt ?? "1970-01-01T00:00:00.000Z"));
    }
    async findUsers(query, lastCreatedAt) {
        return await this.safeSelect((b) => b.or(`display_name.ilike.%${query}%`).gt("created_at", lastCreatedAt ?? "1970-01-01T00:00:00.000Z"));
    }
}
//# sourceMappingURL=UserService.js.map