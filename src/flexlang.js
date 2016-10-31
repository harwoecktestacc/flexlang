function flexlangInit(path, initLang) {
    _fl_downloadLangResource(path, true, initLang);
}
function flexlangReload(lang) {
    if (_fl_resource === undefined) {
        _fl_errorHandler('[flexlang.js] Can\'t load language without resource file! Please call \'flexlangInit(path, initLang)\' first!');
        return;
    }
    _fl_currentLang = lang;
    var all = $('[data-flkey]');
    for (var i = 0; i < all.length; i++) {
        var key = all[i].getAttribute('data-flkey');
        var trans = _fl_getTranslation(lang, key);
        if (trans === undefined) {
            _fl_errorHandler('[flexlang.js] Unable to resolve tranlation key: "' + key + '" for language: "' + lang + '"');
            $(all[i]).html('');
            continue;
        }
        else if (trans === null) {
            _fl_errorHandler('[flexlang.js] Language: "' + lang + '" not defined in resources.');
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
        all[i].setAttribute('data-flkey-language', _fl_currentLang);
    }
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
function flexlangSync() {
    if (_fl_resource === undefined) {
        _fl_errorHandler('[flexlang.js] Can\'t sync resource file without path! Please call \'flexlangInit(path, initLang)\' first!');
        return;
    }
    _fl_downloadLangResource(_fl_resourcePath, true, _fl_currentLang);
}

/*
 * PRIVATE 
 */
var _fl_resource;
var _fl_resourcePath;
var _fl_currentLang;
var _fl_errorHandler = console.log;
function _fl_downloadLangResource(path, callReload, lang) {
    _fl_resourcePath = path;
    $.get(path, function(data) {
        _fl_resource = data;
        if (callReload)
            flexlangReload(lang);
    }, "json");
}
function _fl_getTranslation(lang, key) {
    var langIndex = -1;
    for (var i = 0; i < _fl_resource.languages.length; i++)
        if (_fl_resource.languages[i].id === lang) {
            langIndex = _fl_resource.languages[i].index;
            break;
        }
    if (langIndex === -1)
        return null;
    for (var i = 0; i < _fl_resource.keys.length; i++) {
        if (_fl_resource.keys[i][0] === key) {
            var trans = _fl_resource.keys[i][langIndex];
            if (trans !== '')
                return trans;
            else if (_fl_resource.primaryLanguage !== lang && _fl_resource.fallbackToPrimary)
                return _fl_getTranslation(_fl_resource.primaryLanguage, key);
        }
    }
    return undefined;
}