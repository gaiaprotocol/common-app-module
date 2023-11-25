import {
  PostgrestBuilder,
  PostgrestFilterBuilder,
  PostgrestQueryBuilder,
} from "@supabase/postgrest-js";
import EventContainer from "../event/EventContainer.js";
import Supabase from "./Supabase.js";

export default class SupabaseService extends EventContainer {
  constructor(
    protected tableName: string,
    protected selectQuery: string,
    protected fetchLimit: number,
  ) {
    super();
  }

  protected async safeFetch<T>(
    build: (
      builder: PostgrestQueryBuilder<any, any, unknown>,
    ) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>,
  ) {
    return await Supabase.safeFetch<T>(this.tableName, build);
  }
}
