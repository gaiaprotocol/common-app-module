import { PostgrestBuilder, PostgrestFilterBuilder, PostgrestQueryBuilder } from "@supabase/postgrest-js";
export default class SupabaseService {
    protected tableName: string;
    protected selectQuery: string;
    protected fetchLimit: number;
    constructor(tableName: string, selectQuery: string, fetchLimit: number);
    protected safeFetch(build: (builder: PostgrestQueryBuilder<any, any, unknown>) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>): Promise<any>;
}
//# sourceMappingURL=SupabaseService.d.ts.map