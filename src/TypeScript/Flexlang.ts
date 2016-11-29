"use strict";

class Flexlang {
  // Const fields
  private static readonly GITHUB_REPO : string = "https://github.com/harwoeck/flexlang";

  // Private fields
  private init : JSON;
  private logger : FlexlangLogger;
  private currentLang : string;

  // Properties
  public get Logger() : FlexlangLogger { return this.logger; };
  public set Logger(logger : FlexlangLogger) { this.logger = logger; };
  public get CurrentLanguage() : String { return this.currentLang; };

  // Constructor
  constructor(init : JSON) {
    this.init = init;
    this.logger = console.log;
  }

  public changeLanguage(language : string) : void {
    this.currentLang = language;
    DocumentType[] all = $('');
  }
  public translate(key : string, language : string) : string {
    return "";
  }
}
