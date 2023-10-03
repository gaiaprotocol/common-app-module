import { createClient, SupabaseClient } from "@supabase/supabase-js";
import EventContainer from "../event/EventContainer.js";

class Supabase extends EventContainer {
  public client!: SupabaseClient;

  public connect(supabaseUrl: string, supabaseKey: string) {
    this.client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    });
  }
}

export default new Supabase();
