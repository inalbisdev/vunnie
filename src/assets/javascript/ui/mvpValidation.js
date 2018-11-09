let $ = require('jquery');
let utils = require('../app.utils');

module.exports = {
    locators: {
        $intro: "#js-mvp-intro",
        $start: "#js-mvp-start",
        $content: "#js-mvp-content",
        $form: "#mvpForm",
        $formName: "mvpForm",
        $inputName: "#name",
        $inputCompany: "#company",
        $inputEmail: "#email",
        $submitForm: "#submitMvp",
        $field: ".m-field"
    },

    validateEmail: function (email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    removeAllErrors: function () {
        $('.m-field__error', this.locators.$form).remove();
    },

    focusToInput: function () {

        let $field = $('.o-mvp__form').find('.m-field__error').first().parents('.m-field');
        this.$disableField();
        this.$activeField($field);

        $field.find('.a-input').focus();


    },

    $disableField: function () {
        $(this.locators.$field).removeClass('is-active');
    },

    $activeField: function ($field) {
        $field.addClass('is-active');
    },


    $focusToInput: function ($field) {
        $field.find('input').focus();
    },

    $getFirstField: function () {
        return $(this.locators.$field, this.locators.$form).first();
    },

    validateSingleInput: function ($field) {
        let valid = true,
            that = this,
            $input = $field.find('.is-required'),
            inputErrorMsg = $input.data('error'),
            inputName = $input.attr('name');


        $('.m-field__error', $field).remove();
        $input.removeClass('error');


        if($input.val() === "" ){
            valid = false;
            $input.addClass('error');
            $input.removeClass('is-valid');
            $input.parents('.m-field').append('<span class="m-field__error">'+inputErrorMsg+'</span>');
        }
        if (inputName === "email" && $input.val() !== '') {
            if (!that.validateEmail($input.val())) {
                valid = false;
                $input.addClass('error');
                $input.removeClass('is-valid');
                $input.parents('.m-field').append('<span class="m-field__error">Introduce un email válido</span>');
            }
        }

        if (valid) {
            $input.addClass('is-valid');
        }

        that.$changeProgress();

        return valid;
    },

    validateForm: function (focus) {

        let valid = true,
            that = this;

        $('.is-required', this.locators.$form).each(function () {



            let $this = $(this);
            let inputName = $this.attr("name");
            let inputErrorMsg = $this.data('error');

            if($this.val() === "" ){
                valid = false;
                $this.addClass('error');
                $this.removeClass('is-valid');
                $this.parents('.m-field').append('<span class="m-field__error">'+inputErrorMsg+'</span>');
            }
            if (inputName === "email" && $this.val() !== '') {
                if (!that.validateEmail($this.val())) {
                    valid = false;
                    $this.addClass('error');
                    $this.removeClass('is-valid');
                    $this.parents('.m-field').append('<span class="m-field__error">Introduce un email válido</span>');
                }
            }

        });

        if (!valid && focus) {
            this.focusToInput()
        }

        return valid;
    },


    $getAllOkFields: function () {
        return $('.is-valid', this.locators.$form).length;
    },

    $getAllFields: function () {
        return $('.is-required', this.locators.$form).length;
    },


    $changeProgress: function () {

        $('.o-mvp__progress-num').text(Math.round((this.$getAllOkFields() / this.$getAllFields()) * 100))

    },

    bindEvents: function () {

        let that = this;

        $(this.locators.$field).on('keyup', function () {
            that.validateSingleInput($(this));
        });


        $(this.locators.$field).on('click keyup', function () {
            if (!$(this).hasClass('is-active')) {
                that.$disableField();
                that.$activeField($(this));
            }
        });


        $(this.locators.$start).on('click', function (e) {
            e.preventDefault();
            $(that.locators.$content).toggleClass('is-active');
            that.$activeField(that.$getFirstField());
            that.$focusToInput(that.$getFirstField());
        });

        $(".o-mvp__close").on('click', function (e) {
            e.preventDefault();
            $(that.locators.$content).toggleClass('is-active');
        });


        //Prevent Intro Press
        $(window).keydown(function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                return false;
            }
        });


        $(document).on('keyup change', '.error', function () {
            that.validateSingleInput($(this).parent());
        });


        $(this.locators.$submitForm).on('click', function (e) {
            e.preventDefault();
            that.removeAllErrors();
            if (that.validateForm(true)) {
                $(that.locators.$form).submit();
            }
        });


    },

    init: function () {
        if (this.locators.$form.length > 0) {
            this.bindEvents();
        }

    }
};



