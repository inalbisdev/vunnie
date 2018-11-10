module.exports = {

    locators: {
        $slider: '#userModalSlider',
        $stepLinks: '[data-step]',
        $forgotLink: ".o-user-modal__forgotten"
    },



    getSlider: function(){
      return $(this.locators.$slider);
    },

    goToStep: function(position){
        this.getSlider().slick('slickGoTo',position)
    },


    resetActiveMenu: function(){
        $(this.locators.$stepLinks).removeClass('is-active');
    },

    bindEvents: function(){


        let that = this;

        $(this.locators.$stepLinks).on('click',function () {

            that.resetActiveMenu();

            $(this).addClass('is-active');

            that.goToStep($(this).data('step'));

        });




    },

    init: function () {
        if($(this.locators.$slider.length > 0)){
            this.bindEvents();
        }
    },



};