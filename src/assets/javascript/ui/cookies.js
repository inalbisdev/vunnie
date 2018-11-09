module.exports = {

    createCookie: function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    checkForCookie: function (x) {
        if (!x) {
            $('body').addClass('show-cookies');
        }
    },

    bindEvents: function () {

        let that = this;

        let x = this.readCookie('conditions');
        this.checkForCookie(x);

        $('.m-cookies__btn').on('click', function (e) {
            e.stopImmediatePropagation();
            if (!x) {
                that.createCookie('conditions', '1', 365);
                $('body').removeClass('show-cookies');
            }
        });


    },

    init: function () {
        if($('.m-cookies').length > 0){
            this.bindEvents();
        }
    }
};
