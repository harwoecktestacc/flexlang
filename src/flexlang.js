"use strict";

function flexlangInit(init) {
    if (init.customErrorHandler !== undefined) {
        flexlangSetCustomErrorHandler(init.customErrorHandler);
    }
    if (init.resources === undefined) {
        _fl_printError_invpara('resources');
        return;
    }
    if (init.languages === undefined) {
        _fl_printError_invpara('languages');
        return;
    }
    _fl_init = init;
    _fl_resDownCounter = 0;
    _fl_resDownFinishedCallback = _fl_initSecondPart;
    _fl_resources = Array(_fl_init.resources.length);
    for (var i = 0; i < _fl_init.resources.length; i++)
        _fl_download(_fl_init.resources[i], i, _fl_downloadIncrease);
}
function flexlangChangeLanguage(languageId) {
    if (_fl_init === undefined) {
        _fl_printError_noinit('change language');
        return;
    }
    _fl_changeCurrentLang(languageId);

    var dataAttrName = 'data-flkey';
    if (_fl_init.customKeyAttribute !== undefined)
        dataAttrName = 'data-' + _fl_init.customKeyAttribute;

    var all = $('[' + dataAttrName + ']');
    for (var i = 0; i < all.length; i++) {
        var key = all[i].getAttribute(dataAttrName);
        var trans = _fl_getTranslation(languageId, key);
        if (trans === undefined) {
            _fl_printError_notrans(key, languageId);
            $(all[i]).html('');
            continue;
        }
        else if (trans === null) {
            _fl_printError_nolangdef(languageId);
            return;
        }
        if (all[i].hasAttribute('data-fl-target')) {
            var target = all[i].getAttribute('data-fl-target');
            var targetInfo = target.split(':');
            if (targetInfo.length !== 2) {
                _fl_printError_attrSyn();
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
                    default: _fl_printError_attrSyn();
                        continue;
                }
            }
        }
        else
            $(all[i]).html(trans);
    }
}
function flexlangTranslate(key, languageId) {
    if (_fl_init === undefined) {
        _fl_printError_noinit('load translation');
        return;
    }
    var lang = languageId === undefined ? _fl_currentLanguage : languageId;
    var trans = _fl_getTranslation(lang, key);
    if (trans === undefined) {
        _fl_printError_notrans(key, lang);
        return undefined;
    }
    else if (trans === null) {
        _fl_printError_nolangdef(lang);
        return undefined;
    }
    return trans;
}
function flexlangSetCustomErrorHandler(callback) {
    if (_fl_init === undefined) {
        _fl_printError_noinit('set custom error handler');
        return;
    }
    _fl_errorHandler = callback;
}
function flexlangGetCurrentLanguage() {
    if (_fl_init === undefined) {
        _fl_printError_noinit('get current language');
        return;
    }
    return _fl_currentLanguage;
}

/*
 * PRIVATE
 */
var _fl_init;
var _fl_errorHandler = console.log;
var _fl_githubrepo = 'https://github.com/harwoeck/flexlang';
var _fl_resDownCounter;
var _fl_resDownFinishedCallback;
var _fl_resources;
var _fl_currentLanguage;
var _fl_invalidResources;

function _fl_printError(action, without) {
    _fl_errorHandler('[flexlang.js] Can\'t ' + action + ' without ' + without + '. See ' + _fl_githubrepo + ' for more information.');
}
function _fl_printError_invpara(without) {
    _fl_printError('initialize flexlang', without);
    flexlangSetCustomErrorHandler(console.log);
}
function _fl_printError_noinit(action) {
    _fl_printError(action, 'initialization');
}
function _fl_printError_notrans(key, lang) {
    _fl_errorHandler('[flexlang.js] Unable to resolve tranlation for key: "' + key + '" in language: "' + lang + '".');
}
function _fl_printError_nolangdef(lang) {
    _fl_errorHandler('[flexlang.js] Language: "' + lang + '" not defined in resources.');
}
function _fl_printError_attrSyn() {
    _fl_errorHandler('[flexlang.js] Unkown syntax for "data-fl-target" attribute. See ' + _fl_githubrepo + ' for more information.');
}

function _fl_download(path, index, callback) {
    $.get(path, function(data) {
        _fl_resources[index] = data;
        if (callback !== undefined)
            callback();
    }, "json");
}
function _fl_downloadIncrease() {
    _fl_resDownCounter++;
    if (_fl_resDownCounter === _fl_init.resources.length) {
        var temp = _fl_resDownFinishedCallback;
        _fl_resDownCounter = 0;
        _fl_resDownFinishedCallback = undefined;
        temp();
    }
}
function _fl_initSecondPart() {
    try {
        if (_fl_init.saveLanguageDuringReload) {
            var temp = _fl_getCookie('flexlang_language');
            if (temp !== '') {
                if (_fl_init.defaultLanguage === undefined)
                    _fl_init.defaultLanguage = _fl_init.languages[0].id;
                _fl_setCookie('flexlang_language', temp, 365);
                flexlangChangeLanguage(temp);
                return;
            }
        }
        if (_fl_init.defaultLanguage !== undefined)
            flexlangChangeLanguage(_fl_init.defaultLanguage);
        else {
            _fl_init.defaultLanguage = _fl_init.languages[0].id;
            flexlangChangeLanguage(_fl_init.defaultLanguage);
        }
    }
    finally {
        if (_fl_init.downloadingResourcesFinished !== undefined)
            _fl_init.downloadingResourcesFinished();
    }
}

function _fl_getTranslation(languageId, key) {
    var langIndex = -1;
    for (var i = 0; i < _fl_init.languages.length; i++)
        if (_fl_init.languages[i].id === languageId) {
            langIndex = _fl_init.languages[i].index;
            break;
        }
    if (langIndex === -1)
        return null;
    for (var u = 0; u < _fl_resources.length; u++) {
        for (var i = 0; i < _fl_resources[u].keys.length; i++) {
            if (_fl_resources[u].keys[i].length !== _fl_init.languages.length + 1) {
                var report = 'undefined';
                var isSearchedKey = false;
                if (_fl_resources[u].keys[i].length > 0)
                    if (_fl_resources[u].keys[i][0] !== undefined && _fl_resources[u].keys[i][0] !== null) {
                        report = '"' + _fl_resources[u].keys[i][0] + '"';
                        if (_fl_resources[u].keys[i][0] === key)
                            isSearchedKey = true;
                    }
                _fl_printInvalidResourceError(report, u, i);
                if (isSearchedKey)
                    return undefined;
                continue;
            }
            if (_fl_resources[u].keys[i][0] === key) {
                var trans = _fl_resources[u].keys[i][langIndex + 1];
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
                if (_fl_init.defaultLanguage !== languageId && _fl_init.fallbackToDefaultLanguage) {
                    if (_fl_init.reportFallback)
                        _fl_errorHandler('[flexlang.js] No translation for key: "' + key + '" in language: "' + languageId + '". Use fallback to "' + _fl_init.defaultLanguage  + '".');
                    return _fl_getTranslation(_fl_init.defaultLanguage, key);
                }
            }
        }
    }
    return undefined;
}

function _fl_printInvalidResourceError(report, u, i) {
    var alreadyPrinted = false;
    if (_fl_invalidResources !== undefined)
        for (var k = 0; k < _fl_invalidResources.length; k++) {
            if (_fl_invalidResources[k][0] === u && _fl_invalidResources[k][1] === i) {
                alreadyPrinted = true;
                break;
            }
        }
    if (!alreadyPrinted) {
        if (_fl_invalidResources === undefined)
            _fl_invalidResources = Array();
        _fl_invalidResources[_fl_invalidResources.length] = Array(2);
        _fl_invalidResources[_fl_invalidResources.length - 1][0] = u;
        _fl_invalidResources[_fl_invalidResources.length - 1][1] = i;
        _fl_errorHandler('[flexlang.js] Invalid translation array. Key: ' + report + '. Origin: Resource-Index(' + u + ') Key-Index(' + i + ').');
    }
}

function _fl_setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function _fl_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function _fl_changeCurrentLang(currentLang) {
    if (_fl_init.saveLanguageDuringReload)
        _fl_setCookie("flexlang_language", currentLang, 365);
    _fl_currentLanguage = currentLang;
}
