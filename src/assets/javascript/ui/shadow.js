let toggle =  require('./toggle');

module.exports = {


    locators: {
        $shadow: '.a-shadow',
    },


    createShadow: function(){
        let shadow = $('<div class="a-shadow"/>');
        shadow.appendTo('body').addClass('is-active');
        return shadow;
    },

    isShadowVisible: function(){
        return $(this.locators.$shadow).length > 0;
    },

    removeShadow : function(){

        if(App.ui.toggle.locators.activeToggle && App.ui.toggle.locators.activeToggle.data('toggle-shadow')){
            App.ui.toggle.resetToggle(App.ui.toggle.locators.activeToggle)
        }

        $(this.locators.$shadow).removeClass('is-active').remove();


    },
 
    bindEvents : function () {

        let that = this;

        $(document).on('click',this.locators.$shadow,function (e) {
            that.removeShadow($(this),e);
        });


    },

    init: function () {
        this.bindEvents();
    }
    
}



/*

$('#sendImserso').on('click', function (e) {

    e.preventDefault();
    //recuperamos el formulario donde se ha clicado
    var $form = $(this).parents('form');

    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        valido = true,
        name = $('#nombre'),
        apellido = $('#apellido'),
        numTelefono = $('#numTelefono'),
        poblacion = $('#poblacion'),
        email = $('#email'),
        callHour = $('#callHour');

    $form.next().find('p').remove();
    $('#imserso .required').each(function () {
        $(this).removeClass('error');
    });

    $('#imserso .required').each(function () {
        var $this = $(this),
            inputName = $this.attr("name");
        if (!$this.val()) {
            valido = false;
            $this.addClass('error');
            $form.next().html('<p>Por favor rellena los campos marcados en rojo</p>').show();
        }

        if (inputName == "numTelefono" && $this.val() != "") {
            if (!validatePhone($this.val())) {
                $form.next().html('<p>Por favor introduce un telÃ©fono vÃ¡lido</p>').show();
                valido = false;
                $this.addClass('error');
            }
        }

    });

    if (email.val() !== "") {
        if (!pattern.test(email.val())) {
            email.addClass('error');
            $form.next().append('<p>Por favor introduce un correo electrÃ³nico vÃ¡lido</p>').show();
            valido = false;
        }
    }

    if (email.val().includes("@example.com") || name.val().includes("@") || apellido.val().includes("@") || numTelefono.val().includes("555-555")){
        valido = false;
    }

    //Control si el email viene relleno
    if (valido) {

        $('#imserso .required, #imserso #callhour, #imserso #observaciones').each(function () {
            var $this = $(this);
            if ($this.val()) {
                $this.val($this.val().latinize());
            }
        });

        $.ajax({
            url : $form.attr('action'),
            type : 'GET',
            data : $form.serialize(),
            beforeSend : function (xhr) {
                $form.addClass('sending');
            },
            success : function (data) {
                $form.removeClass('sending');
                if (data.indexOf('OK') > -1) {
                    $form.next().html('<p>Gracias por ponerte en contacto</p>').show();
                } else {
                    $form.next().html('<p>Ha ocurrido un error al enviar el formulario</p>').show();
                }
            },
            error : function (jqXHR, textStatus, error) {
                $form.removeClass('sending');
                $form.next().html('<p>Ha ocurrido un error al enviar el formulario</p>').show();
            }
        });
    }

});
*/