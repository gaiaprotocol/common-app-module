import Component from "./Component.js";
export default abstract class Activatable extends Component {
    constructor(tag: string);
    activate(): void;
    deactivate(): void;
    get activated(): boolean;
}
//# sourceMappingURL=Activatable.d.ts.map