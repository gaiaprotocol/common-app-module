import SupabaseService from "./SupabaseService.js";
export default class UserService extends SupabaseService {
    async fetchUser(userId) {
        const data = await this.safeFetch((b) => b.select(this.selectQuery).eq("user_id", userId));
        return data?.[0];
    }
}
//# sourceMappingURL=UserService.js.map