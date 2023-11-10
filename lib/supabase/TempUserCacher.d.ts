import UserPublic from "../database-interface/UserPublic.js";
export default class TempUserCacher<T extends UserPublic> {
    private userMap;
    cache(user: T): void;
    get(userId: string): T | undefined;
}
//# sourceMappingURL=TempUserCacher.d.ts.map