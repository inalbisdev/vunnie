let $ = require('jquery');
let lazy = require('lazysizes');
let slick = require('slick-carousel');
let _ = require('lodash');
let slickLightBox = require('./vendor/slick-lightbox');



const App = {
    utils: require('./app.utils'),
    ui: require('./app.ui')
};

(function init() {
    window.App = App;
    window.$ = $;
    const initAll = function () {
        App.utils.init();
        _.forEach(App.ui, function (userInterfaceModule) {
            userInterfaceModule.init();
        });
    };
    initAll();
})();
