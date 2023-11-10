import SplashScreen from "./component/SplashScreen.js";
class SplashLoader {
    async load(logo, promises) {
        const splashScreen = new SplashScreen(logo);
        await Promise.all(promises);
        splashScreen.delete();
    }
}
export default new SplashLoader();
//# sourceMappingURL=SplashLoader.js.map