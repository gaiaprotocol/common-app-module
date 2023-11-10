import SplashScreen from "./component/SplashScreen.js";
import DomNode from "./dom/DomNode.js";

class SplashLoader {
  public async load(logo: DomNode, promises: Promise<any>[]) {
    const splashScreen = new SplashScreen(logo);
    await Promise.all(promises);
    splashScreen.delete();
  }
}

export default new SplashLoader();
