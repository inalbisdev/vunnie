let $ = require('jquery');
let utils = require('../app.utils');
let slick = require('slick-carousel');


module.exports = {

    locators: {
        $trigger: '.js-slick'
    },

    initSlider: function ($el) {
        $el.slick({
            nextArrow: '<a class="slick-arrow slick-arrow--left"></a>',
            prevArrow: '<a class="slick-arrow slick-arrow--right"></a>'
        });

        if($el.hasClass('js-slick-light-box')){
            $el.slickLightbox({
                itemSelector        : '.o-hero-slider__media',
                navigateByKeyboard  : true,
            });
        }

    },

    bindEvents: function () {
        this.initSlider($(this.locators.$trigger));
    },

    init: function () {
        if ($(this.locators.$trigger.length > 0)) {
            this.bindEvents();
        }
    }

};