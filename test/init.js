"use strinct";

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

    customKeyAttribute: "flkey"
});