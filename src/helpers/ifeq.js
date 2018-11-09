module.exports = function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
};