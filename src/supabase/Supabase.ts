import { createClient, Provider, SupabaseClient } from "@supabase/supabase-js";
import EventContainer from "../event/EventContainer.js";

class Supabase extends EventContainer {
  public client!: SupabaseClient;
  public devMode: boolean = false;

  public connect(supabaseUrl: string, supabaseKey: string, devMode: boolean) {
    this.devMode = devMode;
    this.client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    });
  }

  public async signIn(provider: Provider) {
    await this.client.auth.signInWithOAuth({
      provider,
      options: this.devMode
        ? { redirectTo: "http://localhost:8413/" }
        : undefined,
    });
  }

  public async signOut() {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }
}

export default new Supabase();
