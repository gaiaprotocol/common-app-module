import SplashScreen from "./component/SplashScreen.js";
import ErrorAlert from "./component/dialogue/ErrorAlert.js";
class SplashLoader {
    async load(logo, promises) {
        const splashScreen = new SplashScreen(logo);
        try {
            await Promise.all(promises);
        }
        catch (e) {
            new ErrorAlert({
                title: "Error",
                message: e.message,
            });
            throw e;
        }
        splashScreen.delete();
    }
}
export default new SplashLoader();
//# sourceMappingURL=SplashLoader.js.map