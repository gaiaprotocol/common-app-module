export default class TempUserCacher {
    userMap = new Map();
    cache(user) {
        this.userMap.set(user.user_id, user);
    }
    get(userId) {
        return this.userMap.get(userId);
    }
}
//# sourceMappingURL=TempUserCacher.js.map