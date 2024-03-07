import { RealtimeChannel } from "@supabase/supabase-js";
import UserPublic from "../database-interface/UserPublic.js";
import EventContainer from "../event/EventContainer.js";
export default abstract class OnlineUserManager extends EventContainer {
    protected channel: RealtimeChannel;
    onlineUsers: {
        [userId: string]: UserPublic & {
            onlineAt: string;
        };
    };
    constructor();
    init(): void;
    protected abstract track(): Promise<void>;
    checkOnline(userId: string): boolean;
}
//# sourceMappingURL=OnlineUserManager.d.ts.map