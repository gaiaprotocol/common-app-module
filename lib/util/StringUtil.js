class StringUtil {
    shortenEthereumAddress(address) {
        if (address.length !== 42 || !address.startsWith("0x"))
            return address;
        return `${address.substring(0, 6)}...${address.substring(38)}`;
    }
    numberWithCommas(x, fixed) {
        if (fixed === undefined || +(+x) > Number.MAX_SAFE_INTEGER) {
            const parts = x.split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts[1] === "0" ? parts[0] : parts.join(".");
        }
        const parts = String(+(+x).toFixed(fixed)).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
}
export default new StringUtil();
//# sourceMappingURL=StringUtil.js.map