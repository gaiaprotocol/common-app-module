import { SupabaseClient } from "@supabase/supabase-js";
import EventContainer from "../event/EventContainer.js";
declare class Supabase extends EventContainer {
    client: SupabaseClient;
    connect(supabaseUrl: string, supabaseKey: string): void;
}
declare const _default: Supabase;
export default _default;
//# sourceMappingURL=Supabase.d.ts.map