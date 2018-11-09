let $ = require('jquery');
let utils = require('../app.utils');

module.exports = {

    locators: {
        $trigger: ".a-button",
        classToAdd: "a-button__ripple"
    },

    createEffect: function (event, $el) {

        let xPos = event.pageX - utils.getOffsetLeft($el),
            yPos = event.pageY - utils.getOffsetTop($el),
            $layer = $('<div/>').addClass(this.locators.classToAdd),
            $getLayer = $("." + this.locators.classToAdd);

        $layer.css({
            width: $el.height(),
            height: $el.height(),
            top: yPos - ($getLayer.height() / 2),
            left: xPos - ($getLayer.width() / 2)
        }).appendTo($el);

        window.setTimeout(function () {
            $layer.remove();
        }, 1600);

    },

    bindEvents: function () {
        let that = this;
        $(this.locators.$trigger).on('click', function (event) {
            that.createEffect(event, $(this));
        });
    },

    init: function () {
        this.bindEvents();
    }

};