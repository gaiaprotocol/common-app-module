import { RealtimeChannel } from "@supabase/supabase-js";
import UserPublic from "../database-interface/UserPublic.js";
import EventContainer from "../event/EventContainer.js";
import Supabase from "../supabase/Supabase.js";

export default abstract class OnlineUserManager extends EventContainer {
  protected channel!: RealtimeChannel;

  public onlineUsers: { [userId: string]: UserPublic & { onlineAt: string } } =
    {};

  constructor() {
    super();
    this.addAllowedEvents("onlineUsersChanged");
  }

  public init() {
    this.channel = Supabase.client.channel("online_users").on(
      "presence",
      { event: "sync" },
      () => {
        const newState: {
          [key: string]: (UserPublic & { onlineAt: string })[];
        } = this.channel.presenceState();

        this.onlineUsers = {};
        for (const state of Object.values(newState)) {
          for (const data of state) {
            if (!this.onlineUsers[data.user_id]) {
              this.onlineUsers[data.user_id] = data;
            }
          }
        }

        this.emit("onlineUsersChanged");
      },
    ).subscribe(async (status, error) => {
      if (status === "SUBSCRIBED") {
        await this.track();
      }
      if (error) console.error(error);
    });
  }

  protected abstract track(): Promise<void>;

  public checkOnline(userId: string): boolean {
    return this.onlineUsers[userId] !== undefined;
  }
}
