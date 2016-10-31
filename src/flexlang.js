function flexlangInit(path, initLang) {
    fl_downloadLangResource(path, true, initLang);
}
function flexlangReload(lang) {
    var all = $('[data-flkey]');
    for (var i = 0; i < all.length; i++) {
        var key = all[i].getAttribute('data-flkey');
        var trans = fl_getTranslation(lang, key);
        if (trans === undefined) {
            console.log('[flexlang.js] Unable to resolve tranlation key: "' + key + '" for language: "' + lang + '"');
            continue;
        }
        if (all[i].hasAttribute('data-fl-target'))
            all[i].setAttribute(all[i].getAttribute('data-fl-target'), trans);
        else 
            all[i].innerHTML = trans;
    }
}

/*
 * PRIVATE 
 */
var _fl_resource;
function fl_downloadLangResource(path, callReload, lang) {
    $.get(path, function(data) {
        _fl_resource = data;
        if (callReload)
            flexlangReload(lang);
    }, "json");
}
function fl_getTranslation(lang, key) {
    var langIndex = -1;
    for (var i = 0; i < _fl_resource.languages.length; i++)
        if (_fl_resource.languages[i].id === lang) {
            langIndex = _fl_resource.languages[i].index;
            break;
        }
    if (langIndex === -1) {
        console.log('[flexlang.js] Language: "' + lang + '" not defined in resources.');
        return undefined;
    }
    for (var i = 0; i < _fl_resource.keys.length; i++) {
        if (_fl_resource.keys[i][0] === key) {
            var trans = _fl_resource.keys[i][langIndex];
            if (trans !== '')
                return trans;
            else if (_fl_resource.primaryLanguage !== lang && _fl_resource.fallbackToPrimary)
                return fl_getTranslation(_fl_resource.primaryLanguage, key);
        }
    }
    return undefined;
}