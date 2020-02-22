let defaultLanguage = 'en';

const tr = (field, params = {}) => {
    let language = languages[defaultLanguage];
    
    let r = fieldsOfFields(language, field);

    if (r === undefined)
        r = fieldsOfFields(languages[defaultLanguage], field);
    return fillParams(r, params);
}

function func(components) {
    let randomStr = "123aweasdKhjhasj{first}asdjhasjkdh";
    randomStr = randomStr.replace("{first}", components.first);
    return randomStr;
}

const fillParams = (original = '', params) => {
    let keys = Object.keys(params);
    let result = original;
    for(let i = 0; i < keys.length; i++) {
        result = result.replace(new RegExp(`{[ \t]*${keys[i]}[ \t]*}`), params[keys[i]]);
    }

    return result;
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

const languages = {
    en: {
        title: "Hello { \tname }!"
    }
};

console.log(tr("title", {name: "Rostik"}));