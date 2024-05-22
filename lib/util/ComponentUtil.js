import MaterialIcon from "../component/MaterialIcon.js";
class ComponentUtil {
    static REFRESH_ICON_START_TOP = 40;
    static REFRESH_TRIGGER_DISTANCE = 100;
    enablePullToRefresh(target, refresh) {
        target.onDom("touchstart", (event) => {
            if (target.domElement.scrollTop !== 0)
                return;
            const refreshIcon = new MaterialIcon("refresh").appendTo(target);
            refreshIcon.style({
                position: "fixed",
                top: ComponentUtil.REFRESH_ICON_START_TOP,
                left: "50%",
                transform: "translateX(-50%)",
                opacity: 0,
                fontWeight: "bold",
                fontSize: 40,
                backgroundColor: "var(--overlay-color)",
                borderRadius: "50%",
            });
            const touch = event.touches[0];
            const start = touch.clientY;
            let move = 0;
            let moved = false;
            const onTouchMove = (event) => {
                const touch = event.touches[0];
                move = touch.clientY - start;
                if (move > 0) {
                    event.preventDefault();
                    moved = true;
                    const rotation = ((move > ComponentUtil.REFRESH_TRIGGER_DISTANCE
                        ? ComponentUtil.REFRESH_TRIGGER_DISTANCE
                        : move) / ComponentUtil.REFRESH_TRIGGER_DISTANCE) *
                        360;
                    refreshIcon.style({
                        top: ComponentUtil.REFRESH_ICON_START_TOP +
                            (move > ComponentUtil.REFRESH_TRIGGER_DISTANCE
                                ? ComponentUtil.REFRESH_TRIGGER_DISTANCE
                                : move),
                        opacity: move > ComponentUtil.REFRESH_TRIGGER_DISTANCE
                            ? 1
                            : move / ComponentUtil.REFRESH_TRIGGER_DISTANCE,
                        transform: `translateX(-50%) rotate(${rotation}deg)`,
                    });
                }
            };
            const onTouchEnd = () => {
                if (moved && move > ComponentUtil.REFRESH_TRIGGER_DISTANCE)
                    refresh();
                refreshIcon.delete();
                target.offDom("touchmove", onTouchMove);
                target.offDom("touchend", onTouchEnd);
            };
            target.onDom("touchmove", onTouchMove);
            target.onDom("touchend", onTouchEnd);
        });
    }
}
export default new ComponentUtil();
//# sourceMappingURL=ComponentUtil.js.map