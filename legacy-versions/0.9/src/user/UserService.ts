import Constants from "../Constants.js";
import UserPublic from "../database-interface/UserPublic.js";
import Supabase from "../supabase/Supabase.js";
import SupabaseService from "../supabase/SupabaseService.js";

export default abstract class UserService<T extends UserPublic>
  extends SupabaseService<T> {
  public async fetchUser(userId: string): Promise<T | undefined> {
    return await this.safeSelectSingle((b) => b.eq("user_id", userId));
  }

  public async fetchNewUsers(lastCreatedAt: string | undefined): Promise<T[]> {
    return await this.safeSelect((b) =>
      b.order("created_at", { ascending: false }).gt(
        "created_at",
        lastCreatedAt ?? Constants.UNIX_EPOCH_START_DATE,
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
        lastCreatedAt ?? Constants.UNIX_EPOCH_START_DATE,
      )
    );
  }

  public async fetchFollowingUsers(
    userId: string,
    lastFetchedFollowedAt: string | undefined,
  ): Promise<{ users: T[]; lastFetchedFollowedAt: string | undefined }> {
    const { data, error } = await Supabase.client.rpc("get_following_users", {
      p_user_id: userId,
      last_fetched_followed_at: lastFetchedFollowedAt,
      max_count: this.fetchLimit,
    });
    if (error) throw error;

    if (data && data.length > 0) {
      lastFetchedFollowedAt = data[data.length - 1].followed_at;
    }

    return {
      users: Supabase.safeResult<T[]>(data ?? []),
      lastFetchedFollowedAt,
    };
  }

  public async fetchFollowers(
    userId: string,
    lastFetchedFollowedAt: string | undefined,
  ): Promise<{ users: T[]; lastFetchedFollowedAt: string | undefined }> {
    const { data, error } = await Supabase.client.rpc("get_followers", {
      p_user_id: userId,
      last_fetched_followed_at: lastFetchedFollowedAt,
      max_count: this.fetchLimit,
    });
    if (error) throw error;

    if (data && data.length > 0) {
      lastFetchedFollowedAt = data[data.length - 1].followed_at;
    }

    return {
      users: Supabase.safeResult<T[]>(data ?? []),
      lastFetchedFollowedAt,
    };
  }
}
