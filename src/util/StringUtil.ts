import { DomChild } from "../dom/DomNode.js";
import el from "../dom/el.js";

class StringUtil {
  public shortenEthereumAddress(address: string) {
    if (address.length !== 42 || !address.startsWith("0x")) return address;
    return `${address.substring(0, 6)}...${address.substring(38)}`;
  }

  public numberWithCommas(x: string, fixed?: number) {
    if (fixed === undefined || +(+x) > Number.MAX_SAFE_INTEGER) {
      const parts = x.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts[1] === "0" ? parts[0] : parts.join(".");
    }
    const parts = String(+(+x).toFixed(fixed)).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  public convertTextToHyperlinks(text: string) {
    const urlPattern =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const urls = text.match(urlPattern);
    const elements: DomChild[] = [];
    let lastIndex = 0;

    if (urls) {
      urls.forEach((url) => {
        const index = text.indexOf(url, lastIndex);
        if (index > lastIndex) {
          elements.push(text.substring(lastIndex, index));
        }
        elements.push(el("a", { href: url, target: "_blank" }, url));
        lastIndex = index + url.length;
      });
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  }
}

export default new StringUtil();
