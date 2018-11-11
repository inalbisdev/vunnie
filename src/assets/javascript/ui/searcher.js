let $ = require('jquery');
let _ = require('lodash');
require('bootstrap-daterangepicker');
module.exports = {
    locators: {
        form: '.o-searcher',
        field: '.o-searcher__field',
        lodging: '.o-searcher__field--lodging .a-input-placeholder',
        lodgingGroup: '.o-searcher__field--lodging',
        destination: '.o-searcher__field--destination input',
        date: '.o-searcher__field--dates input',
        submit: '.o-searcher__field--button input[type="submit"]',

        lodgingContent: '.o-searcher__popover--lodging',
        dateContent: '.o-searcher__popover--dates',

        activeState: 'is-active',
        errorState: 'is-error',
        successState: 'is-success'
    },
    validations: require('../ui/validation'),
    openLodging: function () {
        $(this.locators.lodgingContent).toggleClass(this.locators.activeState);
    },
    openCalendar: function () {
    },


    resetStates: function () {
        let that = this;
        _.forEach($(this.locators.field), function (field) {
            const $element = $(field);
            $element.removeClass(that.locators.successState);
            $element.removeClass(that.locators.errorState);
        });

    },
    validateForm: function () {
        let that = this;
        this.resetStates();
        _.forEach($(this.locators.form + ' input'), function (input) {
            let $input = $(input),
                $parent = $input.closest(that.locators.field);
            if (that.validations.run($input)) {
                if (!$parent.hasClass(that.locators.errorState)) {
                    $parent.addClass(that.locators.successState);
                } else {
                    $parent.removeClass(that.locators.successState);
                }
            } else {
                $parent.addClass(that.locators.errorState);
            }
        });
    },
    checkGroups: function () {
        $(this.locators.lodgingGroup).find('')
    },
    bindLodging: function () {
        $(this.locators.lodging).on('click', $.proxy(this.openLodging, this));
        $(this.locators.lodging).on('change', $.proxy(this.validateForm, this));
    }
    ,
    bindCalendar: function () {
        $(this.locators.date).on('click', this.openCalendar);
    }
    ,
    bindSubmit: function () {
        $(this.locators.submit).on('click', $.proxy(this.validateForm, this));
    }
    ,
    bindEvents: function () {
        this.bindLodging();
        this.bindCalendar();
        this.bindSubmit();
    },
    initDate: function () {
        $('input[name="dates"]').daterangepicker({
            startDate: Date.now(),
            locale: {
                "format": "DD/MM/YYYY",
                "separator": " - ",
                "applyLabel": "Aceptar",
                "cancelLabel": "Cancelar",
                "fromLabel": "De",
                "toLabel": "a",
                "weekLabel": "S",
                "daysOfWeek": [
                    "D",
                    "L",
                    "M",
                    "X",
                    "J",
                    "V",
                    "S"
                ],
                "monthNames": [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
                "firstDay": 1
            },
            opens: 'left'
        });
    },
    init: function () {
        this.bindEvents();
        this.initDate();
    }
};
