let $ = require('jquery');
let utils = require('../app.utils');
let sr  = require('scrollreveal');


module.exports = {

    locators : {
        $trigger: '.js-sr',
        fixedClass: 'is-fixed'
    },


    conf : function(){
        sr().reveal('.js-sr', { delay: 500 });

    },

    bindEvents: function () {
        this.conf();
    },

    init: function () {
        if($(this.locators.$trigger).length > 0){
            this.bindEvents();
        }
    }
};

