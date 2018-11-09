let $ = require('jquery');
let utils = require('../app.utils');




module.exports = {

    locators: {
        $trigger: '.js-scroll',
        $component: '.a-scroll-top',
        isActive: 'is-active',
        ticking: false
    },


    toggleScrollTop: function () {
        utils.isScrollBiggerThanViewPort()
            ? $(this.locators.$component).addClass(this.locators.isActive)
            : $(this.locators.$component).removeClass(this.locators.isActive);
    },


    bindEvents: function () {

        let that = this;

        $(this.locators.$trigger).on('click', function (e) {
            e.preventDefault();
            utils.smoothScroll();
        });

        document.addEventListener('scroll', function () {

            if (!that.locators.ticking) {
                window.requestAnimationFrame(function() {
                    that.toggleScrollTop();
                    that.locators.ticking = false;
                });
                that.locators.ticking = true;
            }


        }, utils.supportPassiveEvents() ? {passive: true} : false);

    },
    init: function () {
        if (this.locators.$trigger.length > 0) {
            this.bindEvents();
        }
    }
};