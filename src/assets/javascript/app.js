let $ = require('jquery');
let _ = require('lodash');
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
