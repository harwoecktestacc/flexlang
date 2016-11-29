///<reference path="./jquery.d.ts" />
/**
MIT License
Copyright (c) 2016 Florian Harwöck
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
"use strict";
class Flexlang {
  // Const fields
  private static readonly GITHUB_REPO : string = "https://github.com/harwoeck/flexlang";

  // Private fields
  private settings : FlexlangSettings;
  private currentLang : string;

  // Properties
  public get Logger() : FlexlangLogger { return this.settings.Logger; };
  public set Logger(logger : FlexlangLogger) { this.settings.Logger = logger; };
  public get CurrentLanguage() : String { return this.currentLang; };

  // Constructor
  constructor(settings : FlexlangSettings) {
    this.settings = settings;
  }

  public changeLanguage(language : string) : void {
    this.currentLang = language;
    let elements: JQuery = $('');
  }
  public translate(key : string, language : string) : string {
    return "";
  }
}
