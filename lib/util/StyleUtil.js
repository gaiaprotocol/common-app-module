class StyleUtil {
    applyTextStroke(target, width, color) {
        let shadow = "";
        for (let i = -width; i <= width; i++) {
            for (let j = -width; j <= width; j++) {
                if (i !== 0 || j !== 0) {
                    shadow += `${i}px ${j}px 0 ${color},`;
                }
            }
        }
        shadow = shadow.slice(0, -1);
        target.style({ textShadow: shadow });
    }
}
export default new StyleUtil();
//# sourceMappingURL=StyleUtil.js.map