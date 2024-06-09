import Supabase from "./supabase/Supabase.js";
import Router from "./view/Router.js";
class AppInitializer {
    initialize(devMode, supabaseUrl, supabaseAnonKey, authorizationToken) {
        if (sessionStorage.__spa_path) {
            Router.goNoHistory(sessionStorage.__spa_path);
            sessionStorage.removeItem("__spa_path");
        }
        if (supabaseUrl && supabaseAnonKey) {
            Supabase.connect(devMode, supabaseUrl, supabaseAnonKey, authorizationToken);
            Supabase.client.auth.onAuthStateChange((event) => {
                if (event === "SIGNED_IN") {
                    Supabase.client.functions.invoke("analyze-user-additional-data");
                }
            });
        }
    }
}
export default new AppInitializer();
//# sourceMappingURL=AppInitializer.js.map