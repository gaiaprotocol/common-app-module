import UserPublic from "../database-interface/UserPublic.js";

export default class TempUserCacher<T extends UserPublic> {
  private userMap = new Map<string, T>();

  public cache(user: T) {
    this.userMap.set(user.user_id, user);
  }

  public get(userId: string): T | undefined {
    return this.userMap.get(userId);
  }
}
