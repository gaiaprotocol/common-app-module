import {
  PostgrestBuilder,
  PostgrestFilterBuilder,
  PostgrestQueryBuilder,
} from "@supabase/postgrest-js";
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

  public async signIn(provider: Provider, scopes?: string[]) {
    await this.client.auth.signInWithOAuth({
      provider,
      options: this.devMode
        ? { redirectTo: "http://localhost:8413/", scopes: scopes?.join(" ") }
        : (scopes ? { scopes: scopes?.join(" ") } : undefined),
    });
  }

  public async signOut() {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }

  private convertNullToUndefined(obj: any) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null) {
        obj[key] = undefined;
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        this.convertNullToUndefined(obj[key]);
      }
    });
  }

  public safeResult<T>(data: T): T {
    if (Array.isArray(data)) {
      data.forEach((obj) => this.convertNullToUndefined(obj));
    } else {
      this.convertNullToUndefined(data);
    }
    return data;
  }

  public async safeFetch<T>(
    tableName: string,
    build: (
      builder: PostgrestQueryBuilder<any, any, unknown>,
    ) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>,
  ) {
    const { data, error } = await build(this.client.from(tableName));
    if (error) throw error;
    return this.safeResult<T>(data);
  }
}

export default new Supabase();
