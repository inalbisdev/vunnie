let $ = require('jquery');
let _ = require('lodash');

module.exports = {
    locators: {
        number: {
            parent: '.u_number_controllers',
            add: '.add',
            subtract: '.subtract'
        }
    },

    bindSubtract: function () {
        var that = this;
        $(this.locators.number.subtract).on('click', function (e) {
            let parent = $(this).closest(that.locators.number.parent);
            that.newValue($(parent.data('target')), false);
        });
    },
    bindAdd: function () {
        var that = this;
        $(this.locators.number.add).on('click', function (e) {
            let parent = $(this).closest(that.locators.number.parent);
            that.newValue($(parent.data('target')), true);
        });
    },

    newValue: function ($element, increment) {
        function applyIncrement() {
            return value > limits.max - step ? value : value + step;
        }
        function applyDecrement() {
            return value < limits.min + step ? value : value - step;
        }
        const limits = {
                max: parseInt($element.attr('max')),
                min: parseInt($element.attr('min')),
            },
            step = parseInt($element.attr('step')),
            value = parseInt($element.val());
        $element.val(increment ? applyIncrement() : applyDecrement())
    },

    enhanceInputNumbers: function () {
        this.bindSubtract();
        this.bindAdd();
    }
    ,
    init: function () {
        this.enhanceInputNumbers();
    }
};



