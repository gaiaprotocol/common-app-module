import Rich from "../../database-interface/Rich.js";
import Component from "../Component.js";
export default class RichDisplay extends Component {
    static NOT_FOUND_IMAGE: string;
    private static cached;
    private uploadingSpinners;
    constructor(rich: Rich, uploading?: boolean, openable?: boolean);
    private openImage;
    uploadDone(): void;
}
//# sourceMappingURL=RichDisplay.d.ts.map