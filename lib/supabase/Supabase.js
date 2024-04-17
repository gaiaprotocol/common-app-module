import { createClient } from "@supabase/supabase-js";
import EventContainer from "../event/EventContainer.js";
class Supabase extends EventContainer {
    client;
    devMode = false;
    supabaseUrl = "";
    supabaseKey = "";
    connect(devMode, supabaseUrl, supabaseKey, authorizationToken) {
        this.devMode = devMode;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        this.reconnect(authorizationToken);
    }
    reconnect(authorizationToken) {
        this.client?.removeAllChannels();
        this.client = createClient(this.supabaseUrl, this.supabaseKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
            },
            ...(authorizationToken
                ? {
                    global: {
                        headers: { Authorization: `Bearer ${authorizationToken}` },
                    },
                }
                : {}),
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
        const { error } = await this.client.auth.signOut();
        if (error)
            throw error;
    }
    convertNullToUndefined(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === null) {
                obj[key] = undefined;
            }
            else if (typeof obj[key] === "object" && obj[key] !== null) {
                this.convertNullToUndefined(obj[key]);
            }
        });
    }
    safeResult(data) {
        if (Array.isArray(data)) {
            data.forEach((obj) => this.convertNullToUndefined(obj));
        }
        else {
            this.convertNullToUndefined(data);
        }
        return data;
    }
    async safeFetch(tableName, build) {
        const { data, error } = await build(this.client.from(tableName));
        if (error)
            throw error;
        return this.safeResult(data);
    }
}
export default new Supabase();
//# sourceMappingURL=Supabase.js.map