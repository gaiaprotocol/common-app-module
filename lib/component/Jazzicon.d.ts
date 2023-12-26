import Component from "./Component.js";
export declare const DEFAULT_SHAPE_COUNT = 3;
export declare const DEFAULT_WOBBLE = 30;
export declare const DEFAULT_BASE_COLORS: string[];
export declare function generateJazziconDataURL(address: string, shapeCount?: number, wobble?: number, baseColors?: string[]): string;
export default class Jazzicon extends Component<HTMLImageElement> {
    constructor(tag: string, address: string);
}
//# sourceMappingURL=Jazzicon.d.ts.map