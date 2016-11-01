<p align="center">
    <a href="#0">
        <img src="https://raw.githubusercontent.com/harwoeck/flexlang/master/logo/logo2.png" height="100px">
    </a>
    <br>
    <strong>A flexible multi language plugin for modern web sites. by Florian Harwöck</strong>
</p>

[![Build Status](https://travis-ci.org/harwoeck/flexlang.svg?branch=master)](https://travis-ci.org/harwoeck/flexlang)
[![license](https://img.shields.io/badge/license-MIT%20license-blue.svg)]()
[![maintenance](https://img.shields.io/badge/maintained%3F-yes-brightgreen.svg)]()
[![release](https://img.shields.io/badge/relase-beta%20development-orange.svg)]()


## Introduction
Flexlang is a JavaScript plugin which allows developer to make their total website mutli language ready in just a few steps. There aren’t any limitations in the number of languages supported by flexlang. The switch between languages occurs without using any network bandwidth or annoying reloads. The plugin is both for single pager and big web applications outstanding to use and easy to implement. The translations are split efficient across all sites to improve performance and speed for the clients.

Not only language loading is very easy with flexlang, also the translation process itself is implemented within the plugin. With an easy function call you can create a complete UI with all current translations, which can be edited directly. To save everything flexlang calls a function from the developer with a json as parameter. In this json the complete new translation and all settings are stored. The only thing a developer need to do now is load it to a server and save it in a static file. Afterwards every user will get a new translation – automatically.


## Keys
flexlang uses unique keys to search through the translation resources. Those keys are stored in the `data-flkey` attribute of the element you want the translation into.

Example:
```html
<p data-flkey="welcome_text"></p>
```

## Resources
flexlang uses a json format in which all translations and settings are stored.
* `primaryLanguage` = Should be the `id` you give your primary language in the `languages` section.
* `fallbackToPrimary` = If a user request the german language but you haven't set the translation of this key for german yet, this setting will decide if flexlang loads the english version as JUST for the elemt where the german language isn't available or if the user will see a white space.
* `languages` = Set a unique identifier `id` for each language. Most common is the usage of two character country codes. The index property is the index of the translation in the `keys` array. Index 0 is reserved for the key itself.
* `keys` = A list of arrays with include the key (at index 0) and translations afterwards.

Example resource file:
```json
{
  "primaryLanguage": "en",
  "fallbackToPrimary": true,
  "languages": [
    {
      "id": "en",
      "index": 1
    },
    {
      "id": "de",
      "index": 2
    }
  ],
  "keys": [
    ["welcome_text", "Welcome to our website!", "Willkommen auf unserer Webseite!"]
  ]
}
```

## Load translations
To load all translations just call:
```javascript
flexlangInit('languageResource.json', 'en');
```
Our HTML example after init:
```html
<p data-flkey="welcome_text">Welcome to our website!</p>
```

## Load another language
```javascript
flexlangReload('de');
```
Our HTML example after reload:
```html
<p data-flkey="welcome_text">Willkommen auf unserer Webseite!</p>
```

## Set translations as an attribute
If you want your translation (for example) as a placeholder you can use the `data-fl-target` attribute. Of course you can use an attribute target you want to.

Example:
```html
<textarea data-flkey="example_placholder_text" data-fl-target="placeholder"></textarea>
```

Result after loading:
```html
<textarea data-flkey="example_placholder_text" data-fl-target="placeholder" placeholder="This is just an example text! Write your own ..."></textarea>
```
