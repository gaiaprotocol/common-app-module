import UserPublic from "../database-interface/UserPublic.js";
import SupabaseService from "./SupabaseService.js";
export default class UserService<T extends UserPublic> extends SupabaseService<T> {
    fetchUser(userId: string): Promise<T | undefined>;
    fetchNewUsers(): Promise<T[]>;
    findUsers(query: string): Promise<T[]>;
}
//# sourceMappingURL=UserService.d.ts.map