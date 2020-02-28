module.exports = (sub, fn) => {
    return (req, res, next) => {
        const subs = req.subdomains;
        if(subs.length === 1) {
            if(sub === '') return fn(req, res, next);
            next();
        }else {
            if(req.subdomains.indexOf(sub) != -1) return fn(req, res, next);
            next();
        }
    }
}