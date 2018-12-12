let $ = require('jquery');
module.exports = {
    run: function ($input) {
        const value = $input.val(),
            type = $input.data('validation'),
            isRequired = $input.attr('required');
        if (!isRequired) {
            return true;
        }
        switch (type) {
            case "string":
                return this.validateString(value);
            case "date":
                return this.validateDate(value);
            case "number":
                return this.validateNumber(value, {
                    max: parseInt($input.attr('max')),
                    min: parseInt($input.attr('min'))
                });
            case "email":
                return this.validateEmail(
                    value
                );
            case "password":
                return this.validatePassword(value);
        }
        return true;
    },
    valueInRange: function (value, max, min) {
        return (value >= min && value <= max);
    },
    validateString: function (value) {
        return value.length > 0;
    },
    validateDate: function () {
        return true;
    },
    validateNumber: function (value, settings) {
        return this.valueInRange(value, settings.max, settings.min);
    },

    validateEmail: function (email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    validatePassword: function (password) {
        return password.length > 6;
    },
    validatePhone: function (phone) {
        let re = /^[\+?|\(]{0,2}[\d\s\-\(\))]{3,}$/;
        let minLenght = 9;
        let MaxLenght = 15;
        let phoneVal = phone.replace(/ /g, '');
        return !!(re.exec(phoneVal) && phoneVal.length >= minLenght && phoneVal.length <= MaxLenght);
    }, init: function () {

    }
};



