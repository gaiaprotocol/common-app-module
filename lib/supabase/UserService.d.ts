import UserPublic from "../database-interface/UserPublic.js";
export default class UserService<T extends UserPublic> {
    private tableName;
    private selectQuery;
    private fetchLimit;
    constructor(tableName: string, selectQuery: string, fetchLimit: number);
    fetchUser(userId: string): Promise<T>;
}
//# sourceMappingURL=UserService.d.ts.map