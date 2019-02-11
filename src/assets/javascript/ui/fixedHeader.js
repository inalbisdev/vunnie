let $ = require('jquery');
let utils = require('../app.utils');


module.exports = {

    locators : {
        $trigger: ".o-header--inv",
        fixedClass: "is-fixed",
        $hero: ".o-hero"
    },



    isHeroOnViewport : function(el,tolerance){

        return (utils.getOffsetBottom(el) - tolerance) > utils.viewPortTop() && utils.getOffsetTop(el) < utils.viewPortBottom();
    },


    toggleFixedHeader : function(){
        let activeClass = this.isHeroOnViewport($(this.locators.$hero),$(this.locators.$trigger).innerHeight());
        activeClass ? $(this.locators.$trigger).removeClass(this.locators.fixedClass) : $(this.locators.$trigger).addClass(this.locators.fixedClass);
    },

    bindEvents: function () {

        let that = this;

        document.addEventListener('scroll',function () {
            that.toggleFixedHeader();
        },utils.supportPassiveEvents() ? {passive: true} : false);

    },

    init: function () {
        if($(this.locators.$trigger).length > 0){
            this.bindEvents();
        }
    }
};

