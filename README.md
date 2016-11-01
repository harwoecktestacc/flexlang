<p align="center">
    <a href="#0">
        <img src="https://raw.githubusercontent.com/harwoeck/flexlang/master/logo/logo.png" height="100px">
    </a>
    <br>
    <strong>A flexible translation plugin for modern web sites</strong>
</p>


[![Build Status](https://travis-ci.org/harwoeck/flexlang.svg?branch=master)](https://travis-ci.org/harwoeck/flexlang)

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
