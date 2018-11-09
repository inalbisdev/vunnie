/*
module.exports("len", function(json) {
    return Object.keys(json).length;
});


module.exports = function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
};
*/
module.exports = function(json){
    return Object.keys(json).length;
};