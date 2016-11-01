"use strict";

function flexlangInit(resourcePath, initLanguageId) {
    if (initLanguageId !== undefined) {
        _fl_currentLanguageId = initLanguageId;
        _fl_downloadResource(resourcePath, _fl_changeLanguageToCurrentLanguage);
    }
    else
        _fl_downloadResource(resourcePath, _fl_changeLanguageToDefaultLanguage);
}
function flexlangChangeLanguage(languageId) {
    if (_fl_resource === undefined) {
        _fl_errorHandler('[flexlang.js] Can\'t change language without resource file! Please call "flexlangInit(resourcePath, initLanguageId)" first!');
        return;
    }
    _fl_currentLanguageId = languageId;
    var all = $('[data-flkey]');
    for (var i = 0; i < all.length; i++) {
        var key = all[i].getAttribute('data-flkey');
        var trans = _fl_getTranslation(languageId, key);
        if (trans === undefined) {
            _fl_errorHandler('[flexlang.js] Unable to resolve tranlation key: "' + key + '" for language: "' + languageId + '"');
            $(all[i]).html('');
            continue;
        }
        else if (trans === null) {
            _fl_errorHandler('[flexlang.js] Language: "' + languageId + '" not defined in resources.');
            return;
        }
        if (all[i].hasAttribute('data-fl-target')) {
            var target = all[i].getAttribute('data-fl-target');
            var targetInfo = target.split(':');
            if (targetInfo.length !== 2) {
                _fl_errorHandler('[flexlang.js] Unkown syntax for \'data-fl-target\' attribute. See https://github.com/harwoeck/flexlang for more information.');
                continue;
            }
            else {
                switch(targetInfo[0]) {
                    case 'attr': all[i].setAttribute(targetInfo[1], trans);
                        break;
                    case 'child': $(all[i]).children(targetInfo[1]).html(trans);
                        break;
                    case 'find': $(all[i]).find(targetInfo[1]).html(trans);
                        break;
                    default: _fl_errorHandler('[flexlang.js] Unkown syntax for \'data-fl-target\' attribute. See https://github.com/harwoeck/flexlang for more information.');
                        break;
                }
            }
        }
        else 
            $(all[i]).html(trans);
        all[i].setAttribute('data-flkey-language', _fl_currentLanguageId);
    }
}
function flexlangTranslate(key, languageId) {
    if (_fl_resource === undefined) {
        _fl_errorHandler('[flexlang.js] Can\'t load language without resource file! Please call \'flexlangInit(path, initLang)\' first!');
        return;
    }
    var trans;
    if (languageId !== undefined)
        trans = _fl_getTranslation(languageId, key);
    else
        trans = _fl_getTranslation(_fl_currentLanguageId, key);
    if (trans === undefined) {
        _fl_errorHandler('[flexlang.js] Unable to resolve tranlation key: "' + key + '" for language: "' + lang + '"');
        return undefined;
    }
    else if (trans === null) {
        _fl_errorHandler('[flexlang.js] Language: "' + lang + '" not defined in resources.');
        return undefined;
    }
    return trans;
}
function flexlangGetAvailableLanguages() {
    if (_fl_resource === undefined) {
        _fl_errorHandler('[flexlang.js] Can\'t load available languages without resource file! Please call \'flexlangInit(path, initLang)\' first!');
        return;
    }
    return _fl_resource.languages;
}
function flexlangSetCustomErrorHandler(callback) {
    _fl_errorHandler = callback;
}
function flexlangReloadResource() {
    if (_fl_resource === undefined) {
        _fl_errorHandler('[flexlang.js] Can\'t sync resource file without path! Please call \'flexlangInit(path, initLang)\' first!');
        return;
    }
    _fl_downloadResource(_fl_resourcePath, _fl_changeLanguageToCurrentLanguage);
}
function flexlangChangeResource(resourcePath) {
    _fl_downloadResource(resourcePath, _fl_changeLanguageToCurrentLanguage);
}

/*
 * PRIVATE 
 */
var _fl_resource;
var _fl_resourcePath;
var _fl_currentLanguageId;
var _fl_errorHandler = console.log;
function _fl_downloadResource(resourcePath, finishedCallback) {
    _fl_resourcePath = resourcePath;
    $.get(resourcePath, function(data) {
        _fl_resource = data;
        if (finishedCallback !== undefined)
            finishedCallback();
    }, "json");
}
function _fl_changeLanguageToCurrentLanguage() {
    flexlangChangeLanguage(_fl_currentLanguageId);
}
function _fl_changeLanguageToDefaultLanguage() {
    flexlangChangeLanguage(_fl_resource.defaultLanguageId);
}
function _fl_getTranslation(languageId, key) {
    var langIndex = -1;
    for (var i = 0; i < _fl_resource.languages.length; i++)
        if (_fl_resource.languages[i].id === languageId) {
            langIndex = _fl_resource.languages[i].index;
            break;
        }
    if (langIndex === -1)
        return null;
    for (var i = 0; i < _fl_resource.keys.length; i++) {
        if (_fl_resource.keys[i][0] === key) {
            var trans = _fl_resource.keys[i][langIndex];
            var isValidTranslation = false;
            if (trans !== '') {
                for (var i = 0; i < trans.length; i++)
                    if (trans[i] !== ' ') {
                        isValidTranslation = true;
                        break;
                    }
                if (isValidTranslation)
                    return trans;
            }
            if (_fl_resource.defaultLanguageId !== languageId && _fl_resource.fallbackToDefaultLanguage) {
                if (_fl_resource.reportFallback)
                    _fl_errorHandler('[flexlang.js] No translation for key: "' + key + '" in language: "' + languageId + '". Use fallback to "' + _fl_resource.defaultLanguageId  + '".');
                return _fl_getTranslation(_fl_resource.defaultLanguageId, key);
            }
            return undefined;
        }
    }
}