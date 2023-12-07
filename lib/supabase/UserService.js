import SupabaseService from "./SupabaseService.js";
export default class UserService extends SupabaseService {
    async fetchUser(userId) {
        return await this.safeSelectSingle((b) => b.eq("user_id", userId));
    }
    async fetchNewUsers() {
        return await this.safeSelect((b) => b.order("created_at", { ascending: false }));
    }
    async findUsers(query) {
        return await this.safeSelect((b) => b.or(`display_name.ilike.%${query}%`));
    }
}
//# sourceMappingURL=UserService.js.map