let $ = require('jquery');
let shadow = require('./shadow');
let utils = require('../app.utils');

module.exports = {

    locators: {
        $trigger: '.js-toggle',
        selfClass: 'is-active',
        activeToggle : ""
    },

    getSettings : function($el){
        let settings = $el.data();
        return {
            target: settings.toggle,
            classToChange: settings.toggleClass,
            createShadow : settings.toggleShadow ? settings.toggleShadow : false
        }
    },

    resetToggle : function($el){

        let settings = this.getSettings($el);
        $el.toggleClass(this.locators.selfClass);
        $(settings.target).toggleClass(settings.classToChange);
        this.locators.activeToggle =  this.locators.activeToggle ? false : $el;
    },


    doToggle: function($el){

        let settings = this.getSettings($el),
            shouldCreateShadow = settings.createShadow && !shadow.isShadowVisible(),
            shouldRemoveShadow = settings.createShadow && shadow.isShadowVisible();

        this.resetToggle($el);


        if(shouldCreateShadow){
            shadow.createShadow();
        }
        if(shouldRemoveShadow){
            shadow.removeShadow();
        }



    },

    bindEvents: function () {

        let that = this;

        $(this.locators.$trigger).on('click',function (e) {
            e.preventDefault();
            that.doToggle($(this));
        });


    },
    init: function () {
        if (this.locators.$trigger.length > 0) {
            this.bindEvents();
        }
    }

};