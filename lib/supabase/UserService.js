import Supabase from "./Supabase.js";
export default class UserService {
    tableName;
    selectQuery;
    fetchLimit;
    constructor(tableName, selectQuery, fetchLimit) {
        this.tableName = tableName;
        this.selectQuery = selectQuery;
        this.fetchLimit = fetchLimit;
    }
    async fetchUser(userId) {
        const { data, error } = await Supabase.client.from(this.tableName).select(this.selectQuery).eq("user_id", userId);
        if (error)
            throw error;
        return data[0];
    }
}
//# sourceMappingURL=UserService.js.map