import EventContainer from "../event/EventContainer.js";
import Supabase from "../supabase/Supabase.js";
export default class OnlineUserManager extends EventContainer {
    channel;
    onlineUsers = {};
    constructor() {
        super();
        this.addAllowedEvents("onlineUsersChanged");
    }
    init() {
        this.channel = Supabase.client.channel("online_users").on("presence", { event: "sync" }, () => {
            const newState = this.channel.presenceState();
            this.onlineUsers = {};
            for (const state of Object.values(newState)) {
                for (const data of state) {
                    if (!this.onlineUsers[data.user_id]) {
                        this.onlineUsers[data.user_id] = data;
                    }
                }
            }
            this.fireEvent("onlineUsersChanged");
        }).subscribe(async (status, error) => {
            if (status === "SUBSCRIBED") {
                await this.track();
            }
            if (error)
                console.error(error);
        });
    }
    checkOnline(userId) {
        return !this.onlineUsers[userId];
    }
}
//# sourceMappingURL=OnlineUserManager.js.map