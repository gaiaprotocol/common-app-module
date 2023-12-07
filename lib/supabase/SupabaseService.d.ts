import { PostgrestBuilder, PostgrestFilterBuilder } from "@supabase/postgrest-js";
import EventContainer from "../event/EventContainer.js";
export default class SupabaseService<T> extends EventContainer {
    protected tableName: string;
    protected selectQuery: string;
    protected fetchLimit: number;
    constructor(tableName: string, selectQuery: string, fetchLimit: number);
    protected safeSelect(build: (builder: PostgrestFilterBuilder<any, any, any, unknown>) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>): Promise<T[]>;
    protected safeSelectSingle(build: (builder: PostgrestFilterBuilder<any, any, any, unknown>) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>): Promise<T | undefined>;
    protected safeInsert(data: Partial<T>): Promise<void>;
    protected safeInsertAndSelect(data: Partial<T>): Promise<NonNullable<Awaited<T>>>;
    protected safeUpdate(build: (builder: PostgrestFilterBuilder<any, any, any, unknown>) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>, data: Partial<T>): Promise<void>;
    protected safeDelete(build: (builder: PostgrestFilterBuilder<any, any, any, unknown>) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>): Promise<void>;
}
//# sourceMappingURL=SupabaseService.d.ts.map