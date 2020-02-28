const funcpro = () => new Promise((resolve, reject) => {
    setInterval(() => {
        reject("A");
        resolve(228);
    }, 1000);
});

const asyncFunc = async () => {
        const data = await funcpro();
        return data;
}

asyncFunc()
    .then(console.log)
    .then(process.exit)
    .catch(console.log)