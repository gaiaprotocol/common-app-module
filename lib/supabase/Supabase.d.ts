import { PostgrestBuilder, PostgrestFilterBuilder, PostgrestQueryBuilder } from "@supabase/postgrest-js";
import { Provider, SupabaseClient } from "@supabase/supabase-js";
import EventContainer from "../event/EventContainer.js";
declare class Supabase extends EventContainer {
    client: SupabaseClient;
    devMode: boolean;
    connect(supabaseUrl: string, supabaseKey: string, devMode: boolean): void;
    signIn(provider: Provider): Promise<void>;
    signOut(): Promise<void>;
    private convertNullToUndefined;
    safeResult<T>(data: T): T;
    safeFetch<T>(tableName: string, build: (builder: PostgrestQueryBuilder<any, any, unknown>) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>): Promise<T>;
}
declare const _default: Supabase;
export default _default;
//# sourceMappingURL=Supabase.d.ts.map