import UserPublic from "../database-interface/UserPublic.js";
import Supabase from "./Supabase.js";

export default class UserService<T extends UserPublic> {
  constructor(
    private tableName: string,
    private selectQuery: string,
    private fetchLimit: number,
  ) {}

  public async fetchUser(userId: string): Promise<T | undefined> {
    const { data, error } = await Supabase.client.from(this.tableName).select(
      this.selectQuery,
    ).eq("user_id", userId);
    if (error) throw error;
    return data[0] as any;
  }
}
