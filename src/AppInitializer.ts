import Supabase from "./supabase/Supabase.js";
import Router from "./view/Router.js";

class AppInitializer {
  public initialize(
    devMode: boolean,
    supabaseUrl?: string,
    supabaseAnonKey?: string,
    authorizationToken?: string,
  ): void {
    if (sessionStorage.__spa_path) {
      Router.goNoHistory(sessionStorage.__spa_path);
      sessionStorage.removeItem("__spa_path");
    }

    if (supabaseUrl && supabaseAnonKey) {
      Supabase.connect(
        devMode,
        supabaseUrl,
        supabaseAnonKey,
        authorizationToken,
      );
      Supabase.client.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_IN") {
          Supabase.client.functions.invoke("analyze-user-additional-data");
        }
      });
    }
  }
}

export default new AppInitializer();
