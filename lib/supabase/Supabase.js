import { createClient } from "@supabase/supabase-js";
import EventContainer from "../event/EventContainer.js";
class Supabase extends EventContainer {
    client;
    devMode = false;
    connect(supabaseUrl, supabaseKey, devMode) {
        this.devMode = devMode;
        this.client = createClient(supabaseUrl, supabaseKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
            },
        });
    }
    async signIn(provider) {
        await this.client.auth.signInWithOAuth({
            provider,
            options: this.devMode
                ? { redirectTo: "http://localhost:8413/" }
                : undefined,
        });
    }
    async signOut() {
        await this.client.auth.signOut();
    }
}
export default new Supabase();
//# sourceMappingURL=Supabase.js.map