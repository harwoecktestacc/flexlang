"use strict";
class FlexlangSettings {
    get Logger() { return this.logger; }
    ;
    set Logger(logger) { this.logger = logger; }
    ;
    constructor(logger) {
        this.logger = logger;
    }
    static fromJson(object) {
        let logger = console.log;
        if (object.logger !== undefined)
            logger = object.logger;
        return new FlexlangSettings(logger);
    }
    static fromJsonPath(path) {
        let y;
        $.get(path, x => { y = FlexlangSettings.fromJson(x); }, "json");
        return y;
    }
}
//# sourceMappingURL=flexlangSettings.js.map