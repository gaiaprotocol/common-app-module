import UserPublic from "../database-interface/UserPublic.js";
import SupabaseService from "./SupabaseService.js";

export default class UserService<T extends UserPublic>
  extends SupabaseService<T> {
  public async fetchUser(userId: string): Promise<T | undefined> {
    return await this.safeSelectSingle((b) => b.eq("user_id", userId));
  }

  public async fetchNewUsers(): Promise<T[]> {
    return await this.safeSelect((b) =>
      b.order("created_at", { ascending: false })
    );
  }
}
