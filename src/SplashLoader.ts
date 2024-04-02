import SplashScreen from "./component/SplashScreen.js";
import ErrorAlert from "./component/dialogue/ErrorAlert.js";
import { DomChild } from "./dom/DomNode.js";

class SplashLoader {
  public async load(logo: DomChild, promises: Promise<any>[]) {
    const splashScreen = new SplashScreen(logo);
    try {
      await Promise.all(promises);
    } catch (e: any) {
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
