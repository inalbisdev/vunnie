let $ = require('jquery');
let utils = require('../app.utils');

module.exports = {

    locators: {
        $trigger: ".js-modal",
        $closeModal: ".o-modal__close",
        open: 'is-opened',
        overflow: "modal-is-opened",
        openedModal: "",
        $stepLinks: '[data-step]',
    },

    toggleSelfState: function($el,state){
        $el.toggleClass('is-active',state);
    },

    togglePageScroll : function(state){
        $('html').toggleClass(this.locators.overflow,state);
    },

    closeModal: function(){
        $(this.locators.openedModal).removeClass(this.locators.open);
        this.togglePageScroll(false);
        $(this.locators.$stepLinks).removeClass('is-active');

    },

    openModal: function($el){
        let modal = $el.data('modal');

        this.toggleSelfState($el,true);

        this.locators.openedModal = $(modal);
        $(modal).addClass(this.locators.open);
        this.togglePageScroll(true);

    },

    checkActiveModal: function(){
      return $('.o-modal').hasClass(this.locators.open);
    },

    createShadow: function(){
      let shadow = $('<div class="o-modal-shadow"></div>');
        shadow.appendTo("body")
    },


    bindEvents: function () {

        let that = this;

        this.createShadow();

        $(document).keyup(function(e) {
            if (e.keyCode === 27 && that.checkActiveModal()) {
                that.closeModal();
            }
        });

        $(this.locators.$closeModal).on('click',function () {
            that.closeModal();
        });

        $(this.locators.$trigger).on('click',function (e) {
            e.preventDefault();
            that.openModal($(this));
        });

    },

    init: function () {
        if($(this.locators.$trigger.length > 0)){
            this.bindEvents();
        }
    }

};