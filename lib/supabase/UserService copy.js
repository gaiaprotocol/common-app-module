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
        const data = await Supabase.safeFetch(this.tableName, (b) => b.select(this.selectQuery).eq("user_id", userId));
        return data[0];
    }
}
//# sourceMappingURL=UserService%20copy.js.map