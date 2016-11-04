<p align="center">
    <a href="#0">
        <img src="https://raw.githubusercontent.com/harwoeck/flexlang/master/logo/logo2.png" height="100px">
    </a>
    <br>
    <strong>A flexible multi language plugin for modern web sites. by Florian Harwöck</strong>
</p>

<p align="center">
    <a href="https://travis-ci.org/harwoeck/flexlang"><img src="https://travis-ci.org/harwoeck/flexlang.svg?branch=master" alt="Build Status"></a>
    <img src="https://img.shields.io/badge/license-MIT%20license-blue.svg" alt="license">
    <img src="https://img.shields.io/badge/maintained%3F-yes-brightgreen.svg" alt="maintenance">
    <img src="https://img.shields.io/badge/release-beta%20development-orange.svg" alt="release">
    <img src="https://img.shields.io/badge/copyright-florian%20harwoeck%202016-red.svg" alt="copyright">
</p>

## Introduction
Flexlang is a JavaScript plugin which allows developers to make their total website mutli language ready in just a few steps. Not only language loading is very easy with flexlang, also the translation process itself is implemented within the plugin. With an easy function call you can create a complete UI with all current translations, which can be edited directly.

## Advantages
* There aren’t any limitations in the number of languages supported by flexlang.
* The switch between languages occurs without using any network bandwidth or annoying reloads.
* The plugin is both for single pager and big web applications easy to implement.
* The translations are split efficient across multiple files to improve performance and load times for the clients.

## Keys
flexlang uses unique keys to search through the translation resources. Those keys are stored in the `data-flkey` attribute of the element you want the translation into.

Example:
```html
<p data-flkey="welcome_text"></p>
```

## Resources
flexlang uses a json format in which all translations are stored in a list called `keys`. In this list each translation has a single string array. Index 0 of the array is the key of the translation itself. Afterwards all translated texts are placed.

Example:
```json
{
  "keys": [
    ["welcome_text", "Welcome to our website!", "Willkommen auf unserer Webseite!"]
  ]
}
```

## Load translations
```javascript
flexlangInit({
    resources: [
        "./flexlang/public.json",
        "./flexlang/admin.json"
    ],
    languages: [
        {
            id: "en",
            index: 0
        },
        {
            id: "de",
            index: 1
        }
    ],

    defaultLanguage: "en",
    fallbackToDefaultLanguage: true,
    reportFallback: true
});
```

## Change language
```javascript
flexlangChangeLanguage('de');
```

## Dependencies
* jQuery
* Bootstrap CSS (only if UI is needed) 

## License 
MIT License

Copyright (c) 2016 Florian Harwöck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.