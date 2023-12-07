import UserPublic from "../database-interface/UserPublic.js";
import SupabaseService from "./SupabaseService.js";

export default class UserService<T extends UserPublic>
  extends SupabaseService<T> {
  public async fetchUser(userId: string): Promise<T | undefined> {
    return await this.safeSelectSingle((b) => b.eq("user_id", userId));
  }

  public async fetchNewUsers(lastCreatedAt: string | undefined): Promise<T[]> {
    return await this.safeSelect((b) =>
      b.order("created_at", { ascending: false }).gt(
        "created_at",
        lastCreatedAt ?? "1970-01-01T00:00:00.000Z",
      )
    );
  }

  public async findUsers(
    query: string,
    lastCreatedAt: string | undefined,
  ): Promise<T[]> {
    return await this.safeSelect((b) =>
      b.or(`display_name.ilike.%${query}%`).gt(
        "created_at",
        lastCreatedAt ?? "1970-01-01T00:00:00.000Z",
      )
    );
  }
}
