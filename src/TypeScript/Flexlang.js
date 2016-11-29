"use strict";
class Flexlang {
    constructor(settings) {
        this.settings = settings;
    }
    get Logger() { return this.settings.Logger; }
    ;
    set Logger(logger) { this.settings.Logger = logger; }
    ;
    get CurrentLanguage() { return this.currentLang; }
    ;
    changeLanguage(language) {
        this.currentLang = language;
        let elements = $('');
    }
    translate(key, language) {
        return "";
    }
}
Flexlang.GITHUB_REPO = "https://github.com/harwoeck/flexlang";
//# sourceMappingURL=flexlang.js.map