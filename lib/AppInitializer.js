import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import Router from "./view/Router.js";
import Supabase from "./supabase/Supabase.js";
class AppInitializer {
    initialize(supabaseUrl, supabaseAnonKey) {
        dayjs.extend(relativeTime);
        if (sessionStorage.__spa_path) {
            Router.goNoHistory(sessionStorage.__spa_path);
            sessionStorage.removeItem("__spa_path");
        }
        Supabase.connect(supabaseUrl, supabaseAnonKey);
    }
}
export default new AppInitializer();
//# sourceMappingURL=AppInitializer.js.map