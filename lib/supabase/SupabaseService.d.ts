import { PostgrestBuilder, PostgrestFilterBuilder, PostgrestQueryBuilder } from "@supabase/postgrest-js";
import EventContainer from "../event/EventContainer.js";
export default class SupabaseService extends EventContainer {
    protected tableName: string;
    protected selectQuery: string;
    protected fetchLimit: number;
    constructor(tableName: string, selectQuery: string, fetchLimit: number);
    protected safeFetch(build: (builder: PostgrestQueryBuilder<any, any, unknown>) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>): Promise<any>;
}
//# sourceMappingURL=SupabaseService.d.ts.map