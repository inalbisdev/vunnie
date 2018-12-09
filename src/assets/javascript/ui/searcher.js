//TODO: Rename to validationController.js
var $ = require('jquery');
var _ = require('lodash');
require('bootstrap-daterangepicker');
module.exports = {
    locators: {
        searcher: {
            form: '.o-searcher',
            field: '.o-searcher__field',
            lodgingContainer: '.o-searcher__field--lodging',
            lodging: '.o-searcher__field--lodging .a-input-placeholder',
            lodgingGroup: '.o-searcher__field--lodging',
            destination: '.o-searcher__field--destination input',
            date: '.o-searcher__field--dates input',
            submit: '.o-searcher__field--button input[type="submit"]',
            lodgingContent: '.o-searcher__popover--lodging',
            dateContent: '.o-searcher__popover--dates'
        },

        modal: {
            form: '.o-modal form',
            field: '.m-field'
        },
        activeState: 'is-active',
        errorState: 'is-error',
        successState: 'is-success',
        messageDiv: 'field-error'
    },
    validations: require('../ui/validation'),
    openLodging: function () {
        $(this.locators.searcher.lodgingContent).addClass(this.locators.activeState);
    },
    closeLodging: function () {
        $(this.locators.searcher.lodgingContent).removeClass(this.locators.activeState);
    },
    toggleLodging: function () {
        $(this.locators.searcher.lodgingContent).toggleClass(this.locators.activeState);
    },
    resetStates: function (field) {
        var that = this;
        _.forEach($(field), function (field) {
            const $element = $(field);
            $element.removeClass(that.locators.successState);
            $element.removeClass(that.locators.errorState);
        });
    },
    removeAllMessageStatus: function () {
        $(this.locators.messageDiv).remove();
    },
    createMessageStatus: function (message) {
        return $('<div/>', {
            class: this.locators.messageDiv,
            html: message
        });
    },
    validateForm: function (locatorForm, locatorField) {
        var that = this;
        this.resetStates(locatorField);
        that.removeAllMessageStatus();
        _.forEach($(locatorForm + ' input'), function (input) {
            var $input = $(input),
                $parent = $input.closest(locatorField),
                error = $input.data('error');
            if (that.validations.run($input)) {
                if (!$parent.hasClass(that.locators.errorState)) {
                    $parent.addClass(that.locators.successState);
                } else {
                    $parent.removeClass(that.locators.successState);
                }
            } else {
                $parent.addClass(that.locators.errorState);
                $parent.append(that.createMessageStatus(error ? error : 'Error de validación'));
            }
        });
    },
    onChangeNumber: function () {
        const $container = $(this.locators.searcher.lodgingContent),
            adults = $container.find('#adults').val(),
            children = $container.find('#children').val(),
            babies = $container.find('#babies').val();
        $(this.locators.searcher.lodging).text('Adultos:' + adults + ' Niños:' + children + ' Bebés:' + babies);

        this.validateForm(this.locators.searcher.form, this.locators.searcher.field);


    },
    isInputLodging: function ($target) {
        return $target.closest(this.locators.searcher.lodgingContainer).length > 0;
    },
    isLodgingContent: function ($target) {
        return $target.closest(this.locators.searcher.lodgingContent).length > 0;
    },
    bindLodging: function () {
        var that = this;
        $(this.locators.searcher.lodgingContent + ' input[type="number"]').on('change', $.proxy(this.onChangeNumber, this));
        $(document).on('click', function (e) {
            var $target = $(e.target);
            if (that.isLodgingContent($target)) {
                return;
            }
            if (that.isInputLodging($target) && !$(that.locators.lodgingContent).hasClass('is-active')) {
                that.openLodging();
                return;
            }
            that.closeLodging();
        });

        $('.o-searcher__popover--apply a').on('click',function (e) {
            e.preventDefault();
            that.closeLodging();
        })
    }
    ,
    bindCalendar: function () {
        $(this.locators.date).on('click', this.openCalendar);
    }
    ,
    bindSubmitSearcher: function () {
        var that = this;
        $(this.locators.searcher.submit).on('click', function () {
            that.validateForm(that.locators.searcher.form, that.locators.searcher.field);
        });
    }
    ,
    bindModals: function () {
        var that = this;
        $(document).on('click', that.locators.modal.form, function () {
            that.validateForm(that.locators.modal.form, that.locators.modal.field);
        })
    },
    bindEvents: function () {
        this.bindLodging();
        this.bindCalendar();
        this.bindSubmitSearcher();
        this.bindModals();
    },
    initDate: function () {
        var $datesInputs = $('input[name="dates"]')
        $datesInputs.daterangepicker({
            startDate: Date.now(),
            "autoApply": true,
            "linkedCalendars": false,
            "showCustomRangeLabel": false,
            "opens": "center",
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
            }
        });
        $datesInputs.val('Elige tu fecha');
    },
    init: function () {
        this.bindEvents();
        this.initDate();
    }
};
