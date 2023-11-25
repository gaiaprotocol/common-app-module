import UserPublic from "../database-interface/UserPublic.js";
import SupabaseService from "./SupabaseService.js";

export default class UserService<T extends UserPublic> extends SupabaseService {
  public async fetchUser(userId: string): Promise<T | undefined> {
    const data = await this.safeFetch<T[]>((b) =>
      b.select(this.selectQuery).eq("user_id", userId)
    );
    return data?.[0];
  }
}
