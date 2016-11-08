<p align="center">
    <a href="#0">
        <img src="https://raw.githubusercontent.com/harwoeck/flexlang/master/logo/logo.png" height="100px">
    </a>
    <br>
    <strong>A flexible multi language plugin for modern web sites. by Florian Harwöck</strong>
</p>

<p align="center">
    <a href="https://travis-ci.org/harwoeck/flexlang"><img src="https://travis-ci.org/harwoeck/flexlang.svg?branch=master" alt="build status"></a>
    <img src="https://img.shields.io/badge/license-MIT%20license-blue.svg" alt="license">
    <img src="https://img.shields.io/badge/maintained%3F-yes-brightgreen.svg" alt="maintenance">
    <img src="https://img.shields.io/badge/release-beta%20development-orange.svg" alt="release">
    <img src="https://img.shields.io/badge/copyright-florian%20harwoeck%202016-red.svg" alt="copyright">
</p>

# Introduction
flexlang is a JavaScript plugin which allows developers to make their total website mutli language ready in just a few steps. Not only multi language loading is supported, also the process of translation itself is implemented within the plugin. For this a complete modern UI with all current translations, which can be edited directly, is rendered.

### Advantages
* The switch between languages occurs without using any network bandwidth or annoying website reloads
* The plugin is both for single pager and big web applications easy and fast to implement
* There aren’t any limitations in the number of languages supported
* The translations are split efficient across multiple files to improve performance and load times for the clients
* Improves page loads (Browser caching translation resource files)
* Transfer the process of searching the right translation to your clients instead of doing it on your server

# Live Demo
[Live Demo from one of our users (thebotchallenge.com)](https://thebotchallenge.com)

# Keys
flexlang uses unique keys to search through the translation resources. Those keys are stored in the `data-flkey` attribute of the element you want the translation into.

Example:
```html
<p data-flkey="welcome_text"></p>
```

# Resources
flexlang uses a json format in which all translations are stored in a list called `keys`. In this list each translation has a single string array. Index 0 of the array is the key of the translation itself. Afterwards all translated texts are placed.

Example:
```json
{
  "keys": [
    ["welcome_text", "Welcome to our website!", "Willkommen auf unserer Webseite!"]
  ]
}
```

# Load translations
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
    reportFallback: true,
    customKeyAttribute: "flkey",
    saveLanguageDuringReload: true,
    downloadingResourcesFinished: console.log
});
```

### Options
Argument | Default value | Description
-------- | ------------- | -----------
defaultLanguage | languages[0].id | This language will be loaded after downloading resources. Except: `saveLanguageDuringReload` is set to true and flexlang saved the language in this browser before.
fallbackToDefaultLanguage | true | In the case there isn't a translation for a specific key in a language (other than `defaultLanguage`) flexlang will load try to load the translation from the `defaultLanguage`.
reportFallback | false | If this property is set to true, flexlang will report every fallback scenario to the current error handler (can be set through `customErrorHandler` or `flexlangSetCustomErrorHandler(callback)`).
customKeyAttribute | 'flkey' | With this attribute flexlang detects elements which need a translation. The attribute value is the translation key defined in the resource file. If you don't want to use 'data-flkey' (default) you can set this property to (for example) 'key' and flexlang will search after all elements with attribute 'data-key'.
saveLanguageDuringReload | true | flexlang will set browser cookies to save languages which will be used in the next init process as inital language for the user.
downloadingResourcesFinished | undefined | flexlang will use this callback to inform the user when all resources are loaded.
customErrorHandler | console.log | This function will be called when flexlang whats to log something. All callbacks will be called with a string which contains all informations.<br>Example: `callback('[flexlang.js] This is a information from flexlang to inform my user');`

# Functions

```javascript
flexlangInit(object);
flexlangChangeLanguage('de');
flexlangTranslate(key, language); // Returns the key translated into the language. Exception: return undefined (see log)
flexlangSetCustomErrorHandler(callback);
flexlangGetCurrentLanguage(); // Returns current language. Exception: return undefined (see log)
```

# Dependencies
* jQuery
* Bootstrap CSS (only if UI is needed) 

# License 
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
