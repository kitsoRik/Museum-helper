import React from 'react';
import en from "./en";
import ua from "./ua";

let store;
let defaultLanguage = 'en';

export const setStore = (s) => store = s;

export const tr = (field, params = {}) => {
    let language = languages[defaultLanguage];
    if (store)
        language = languages[store.getState().language];
    
    let r = fieldsOfFields(language, field);

    if (r === undefined)
        r = fieldsOfFields(languages[defaultLanguage], field);
    return fillParams(r, params);
}

export const trx = (field, params = {}) => {
    let language = languages[defaultLanguage];
    if (store)
        language = languages[store.getState().language];
    
    let r = fieldsOfFields(language, field);

    if (r === undefined)
        r = fieldsOfFields(languages[defaultLanguage], field);
    
    return fillXParams(r, params);
}

const fillParams = (original = '', params) => {
    let keys = Object.keys(params);
    let result = original;
    for(let i = 0; i < keys.length; i++) {
        result = result.replace(new RegExp(`{[ \t]*${keys[i]}[ \t]*}`), params[keys[i]]);
    }

    return result;
}

const fillXParams = (original = '', params) => {
    const keys = Object.keys(params);
    if(keys.length === 0) return (<>{original}</>)

    let key = keys[0];
    for(let i = 1; i < keys.length; i++) {
        if(original.indexOf(`{${keys[i]}}`) < original.indexOf(`{${key}}`))
            key = keys[i];
    }

    let result = original;
    const find = `{${key}}`;
    const index = result.indexOf(find);
    const object = params[key];
    delete params[key];
    return (<>{result.slice(0, index)}{object}{fillXParams(result.slice(index + find.length), params)}</>);
}

const fieldsOfFields = (obj, gField) => {
    const fields = gField.split('.');
    let current = obj;

    for (let i = 0; i < fields.length; i++) {
        current = current[fields[i]];

        if (!current && current !== false)
            return undefined;
    }

    return current;
}

export const languages = {
    en,
    ua
};