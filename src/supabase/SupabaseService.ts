import {
  PostgrestBuilder,
  PostgrestFilterBuilder,
} from "@supabase/postgrest-js";
import EventContainer from "../event/EventContainer.js";
import Supabase from "./Supabase.js";

export default class SupabaseService<T> extends EventContainer {
  constructor(
    protected tableName: string,
    protected selectQuery: string,
    protected fetchLimit: number,
  ) {
    super();
  }

  protected async safeSelect(
    build: (
      builder: PostgrestFilterBuilder<any, any, any, unknown>,
    ) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>,
  ) {
    const data = await Supabase.safeFetch<T[]>(
      this.tableName,
      (b) => build(b.select(this.selectQuery).limit(this.fetchLimit)),
    );
    return data ?? [];
  }

  protected async safeSelectSingle(
    build: (
      builder: PostgrestFilterBuilder<any, any, any, unknown>,
    ) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>,
  ): Promise<T | undefined> {
    const data = await Supabase.safeFetch<T[]>(
      this.tableName,
      (b) => build(b.select(this.selectQuery).limit(1)),
    );
    return data?.[0];
  }

  protected async safeInsert(data: Partial<T>) {
    const { error } = await Supabase.client.from(this.tableName).insert(data);
    if (error) throw error;
  }

  protected async safeInsertAndSelect(data: Partial<T>) {
    const saved = await Supabase.safeFetch<T>(
      this.tableName,
      (b) => b.insert(data).select(this.selectQuery).single(),
    );
    return saved!;
  }

  protected async safeUpdate(
    build: (
      builder: PostgrestFilterBuilder<any, any, any, unknown>,
    ) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>,
    data: Partial<T>,
  ) {
    const { error } = await build(
      Supabase.client.from(this.tableName).update(data),
    );
    if (error) throw error;
  }

  protected async safeDelete(
    build: (
      builder: PostgrestFilterBuilder<any, any, any, unknown>,
    ) => PostgrestFilterBuilder<any, any, any, unknown> | PostgrestBuilder<any>,
  ) {
    const { error } = await build(
      Supabase.client.from(this.tableName).delete(),
    );
    if (error) throw error;
  }
}
