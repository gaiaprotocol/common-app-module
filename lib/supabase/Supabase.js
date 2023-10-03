import { createClient } from "@supabase/supabase-js";
import EventContainer from "../event/EventContainer.js";
class Supabase extends EventContainer {
    client;
    connect(supabaseUrl, supabaseKey) {
        this.client = createClient(supabaseUrl, supabaseKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
            },
        });
    }
}
export default new Supabase();
//# sourceMappingURL=Supabase.js.map