import UserPublic from "../database-interface/UserPublic.js";
import SupabaseService from "./SupabaseService.js";
export default class UserService<T extends UserPublic> extends SupabaseService {
    fetchUser(userId: string): Promise<T | undefined>;
}
//# sourceMappingURL=UserService.d.ts.map