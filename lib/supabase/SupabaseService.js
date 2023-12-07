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
    async safeSelect(build) {
        const data = await Supabase.safeFetch(this.tableName, (b) => build(b.select(this.selectQuery).limit(this.fetchLimit)));
        return data ?? [];
    }
    async safeSelectSingle(build) {
        const data = await Supabase.safeFetch(this.tableName, (b) => build(b.select(this.selectQuery).limit(1)));
        return data?.[0];
    }
    async safeInsert(data) {
        const { error } = await Supabase.client.from(this.tableName).insert(data);
        if (error)
            throw error;
    }
    async safeInsertAndSelect(data) {
        const saved = await Supabase.safeFetch(this.tableName, (b) => b.insert(data).select(this.selectQuery).single());
        return saved;
    }
    async safeUpdate(build, data) {
        const { error } = await build(Supabase.client.from(this.tableName).update(data));
        if (error)
            throw error;
    }
    async safeDelete(build) {
        const { error } = await build(Supabase.client.from(this.tableName).delete());
        if (error)
            throw error;
    }
}
//# sourceMappingURL=SupabaseService.js.map