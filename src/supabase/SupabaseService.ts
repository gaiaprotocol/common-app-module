import {
  PostgrestBuilder,
  PostgrestFilterBuilder,
  PostgrestQueryBuilder,
} from "@supabase/postgrest-js";
import Supabase from "./Supabase.js";

export default class SupabaseService {
  constructor(
    protected tableName: string,
    protected selectQuery: string,
    protected fetchLimit: number,
  ) {}

  protected async safeFetch(
    build: (
      builder: PostgrestQueryBuilder<any, any, unknown>,
    ) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>,
  ) {
    return await Supabase.safeFetch(this.tableName, build);
  }
}
