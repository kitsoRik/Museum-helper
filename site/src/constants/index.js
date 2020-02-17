export const 
    LOADED = "LOADED",
    LOADED_ERROR = "LOADED_ERROR",
    IS_LOADING = "IS_LOADING",
    NOT_LOADED = "NOT_LOADED",
    ERROR_LOADING = "ERROR_LOADING",

    DIRECTION_UP = "DIRECTION_UP",
    DIRECTION_DOWN = "DIRECTION_DOWN";

export const LANGUAGES = [
    { dev: 'ukrainian', prod: 'Українська (Ukrainian)' },
    { dev: 'russian', prod: 'Русская (Russian)' },
    { dev: 'english', prod: 'English' },
    { dev: 'belarus', prod: 'Беларуская (Belarusian)' }
]

// export const LANGUAGES_BY_DEV = LANGUAGES.reduce((p = {}, c) => { p[c.dev] = c.prod });
export const LANGUAGES_BY_DEV = (() => {
    let result = {};
    LANGUAGES.forEach(l => {
        result[l.dev] = l.prod
    });
    return result;
})();