import EventContainer from "../event/EventContainer.js";
import Supabase from "./Supabase.js";
export default class SupabaseService extends EventContainer {
    tableName;
    selectQuery;
    fetchLimit;
    constructor(tableName, selectQuery, fetchLimit) {
        super();
        this.tableName = tableName;
        this.selectQuery = selectQuery;
        this.fetchLimit = fetchLimit;
    }
    async safeFetch(build) {
        return await Supabase.safeFetch(this.tableName, build);
    }
}
//# sourceMappingURL=SupabaseService.js.map