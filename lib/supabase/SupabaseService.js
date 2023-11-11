import Supabase from "./Supabase.js";
export default class SupabaseService {
    tableName;
    selectQuery;
    fetchLimit;
    constructor(tableName, selectQuery, fetchLimit) {
        this.tableName = tableName;
        this.selectQuery = selectQuery;
        this.fetchLimit = fetchLimit;
    }
    async safeFetch(build) {
        return await Supabase.safeFetch(this.tableName, build);
    }
}
//# sourceMappingURL=SupabaseService.js.map