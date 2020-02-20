const correctKey = (key) => {
    for(let i = 0; i < key.length; i++) {
        const isUpp = key[i] === key[i].toUpperCase();
        if(isUpp) {
            const begin = key.slice(0, i);
            const end = key.slice(i + 1);

            key = begin + `_${key[i++].toLowerCase()}` + end;
        }
    }
    return key;
}

console.log(correctKey("includeReleaser"));