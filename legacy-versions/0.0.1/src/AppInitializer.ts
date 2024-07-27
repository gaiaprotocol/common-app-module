import Supabase from "./supabase/Supabase.js";
import Router from "./view/Router.js";

class AppInitializer {
  public initialize(
    supabaseUrl: string,
    supabaseAnonKey: string,
    devMode: boolean,
  ): void {
    if (sessionStorage.__spa_path) {
      Router.goNoHistory(sessionStorage.__spa_path);
      sessionStorage.removeItem("__spa_path");
    }

    Supabase.connect(supabaseUrl, supabaseAnonKey, devMode);
    Supabase.client.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        Supabase.client.functions.invoke("store-user-avatar");
      }
    });
  }
}

export default new AppInitializer();
