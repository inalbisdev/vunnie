let $ = require('jquery');

module.exports = {

    isElementOnViewPort: function (el) {
        return this.getOffsetBottom(el) > this.viewPortTop() && this.getOffsetTop(el) < this.viewPortBottom();
    },
    viewPortTop: function () {
        return $(window).scrollTop();
    },
    viewPortBottom: function () {
        return this.viewPortTop() + $(window).height();
    },
    smoothScroll: function (scrollTop, timing, target) {

        timing = typeof timing !== 'undefined' ? timing : 500;
        scrollTop = scrollTop || 0;
        target = target || $('html,body');

        target.animate(
            {
                scrollTop: scrollTop
            }, timing
        );
        return false;

    },
    checkDataFromObject: function (el, data) {
        return !!$(el).data(data);
    },
    getOffsetTop: function (el) {
        return el.offset().top;
    },
    isScrollBiggerThanViewPort: function () {
        return $(window).scrollTop() > $(window).height();
    },
    getOffsetBottom: function (el) {
        return this.getOffsetTop(el) + this.getOuterHeight(el);
    },
    getOffsetLeft: function (el) {
        return el.offset().left;
    },
    getOuterWidth: function (el) {
        return el.outerWidth();
    },
    getOuterHeight: function (el) {
        return el.outerHeight();
    },
    getCenterPosition: function (el) {
        return this.getOffsetLeft(el) + this.getOuterWidth(el) / 2;
    },
    getAxisY: function (el, tolerance) {
        tolerance = tolerance || 0;
        return this.getOffsetTop(el) + this.getOuterHeight(el) + tolerance;
    },
    getAxisX: function (el, obj) {
        return this.getOffsetLeft(el);
    },
    centerElementToAnother: function (el, obj) {
        return this.getAxisX(el) - (this.getOuterWidth(obj) / 2) + (this.getOuterWidth(el) / 2);
    },
    getUserAgent: function () {
        let ua = navigator.userAgent;
        return {
            ua: ua,
            browser: /Edge\/\d+/.test(ua) ? "ed" : /MSIE 9/.test(ua) ? "ie9" : /MSIE 10/.test(ua) ? "ie10" : /MSIE 11/.test(ua) ? "ie11" : /MSIE\s\d/.test(ua) ? "ie?" : /rv\:11/.test(ua) ? "ie11" : /Firefox\W\d/.test(ua) ? "ff" : /Chrome\W\d/.test(ua) ? "gc" : /Chromium\W\d/.test(ua) ? "oc" : /\bSafari\W\d/.test(ua) ? "sa" : /\bOpera\W\d/.test(ua) ? "op" : /\bOPR\W\d/i.test(ua) ? "op" : typeof MSPointerEvent !== "undefined" ? "ie?" : "",
            os: /Windows NT 10/.test(ua) ? "win10" : /Windows NT 6\.0/.test(ua) ? "winvista" : /Windows NT 6\.1/.test(ua) ? "win7" : /Windows NT 6\.\d/.test(ua) ? "win8" : /Windows NT 5\.1/.test(ua) ? "winxp" : /Windows NT [1-5]\./.test(ua) ? "winnt" : /Mac/.test(ua) ? "mac" : /Linux/.test(ua) ? "linux" : /X11/.test(ua) ? "nix" : "",
            mobile: /IEMobile|Windows Phone|Lumia/i.test(ua) ? "w" : /iPhone|iP[oa]d/.test(ua) ? "i" : /Android/.test(ua) ? "a" : /BlackBerry|PlayBook|BB10/.test(ua) ? "b" : /Mobile Safari/.test(ua) ? "s" : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(ua) ? 1 : 0,
            tablet: /Tablet|iPad/i.test(ua),
            touch: "ontouchstart" in document.documentElement
        }
    },
    checkIfIsDevice: function () {
        let isDecive = false;
        let userAgent = this.getUserAgent();
        if (userAgent.mobile !== 0 || userAgent.tablet !== false) {
            isDecive = true;
            $("html").addClass("is-device");
        }
        return isDecive;
    },


    supportPassiveEvents: function () {
        let supportsPassive = false;
        try {
            let opts = Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassive = true;
                }
            });
        } catch (e) {
        }
    },


    init: function () {
        this.checkIfIsDevice()
    }


};