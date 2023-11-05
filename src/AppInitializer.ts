import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import Supabase from "./supabase/Supabase.js";
import Router from "./view/Router.js";

class AppInitializer {
  public initialize(supabaseUrl: string, supabaseAnonKey: string): void {
    dayjs.extend(relativeTime);

    if (sessionStorage.__spa_path) {
      Router.goNoHistory(sessionStorage.__spa_path);
      sessionStorage.removeItem("__spa_path");
    }

    Supabase.connect(supabaseUrl, supabaseAnonKey);
    Supabase.client.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        Supabase.client.functions.invoke("store-profile-image");
      }
    });
  }
}

export default new AppInitializer();
