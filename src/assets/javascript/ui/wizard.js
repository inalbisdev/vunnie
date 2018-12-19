module.exports = {

    locators: {
        $slider: '#userModalSlider',
        $stepLinks: '[data-step]',
        $togglePasswordVisibility: ".js-toggle-visibility"
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



    changeInputType : function($el){
        let target = $el.data('target'),
            inputType = $(target).prop('type');


        $el.toggleClass('is-active');

        if(inputType === "text"){
            $(target).prop('type', 'password');
        }else{
            $(target).prop('type', 'text');
        }

    },


    bindEvents: function(){


        let that = this;

        $(this.locators.$stepLinks).on('click',function () {

            that.resetActiveMenu();

            $(this).addClass('is-active');

            that.goToStep($(this).data('step'));

        });


        $(this.locators.$togglePasswordVisibility).on('click',function (e) {
            e.preventDefault();
            that.changeInputType($(this));
        });




    },

    init: function () {
        if($(this.locators.$slider.length > 0)){
            this.bindEvents();
        }
    },



};