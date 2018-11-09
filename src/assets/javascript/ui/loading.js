let $ = require('jquery');

module.exports = {

    locators : {
        $loading : '.m-loading'
    },

    setSessionStorage: function(){
        sessionStorage.setItem('loading','1');
    },

    bindEvents: function () {
        let that = this;
        document.addEventListener("DOMContentLoaded", function() {
            that.setSessionStorage();
            $(that.locators.$loading).addClass('is-hidden');
        });


    },
    init: function () {
        this.bindEvents();
    }

};