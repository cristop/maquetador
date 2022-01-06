var _html = "";
var _css = "";
var _mobile = "";
var data = "";
var id_section = "";
var tipo_ruta = "";
var image_gral = "";
var vista_previa = false;

$(function () {
    //mostrar o quitar el campo custom
    $('#tipo-ruta').on('change', function () {
        tipo_ruta = parseInt($(this).val());
        //aplicar ruta de imagen, una imagen para todo
        switch (tipo_ruta) {
            case 1:
                if ($('#webp').is(':checked')) {
                    image_gral = "{{ 'assets/img/logo.svg'|theme|webp }}";
                } else {
                    image_gral = "{{ 'assets/img/logo.svg'|theme }}";
                }

                imagen = '<img src="' + image_gral + '" loading="lazy" width="100%" height="100%" alt="" />';
                break;
            case 2:
                image_gral = "assets/img/logo";

                if ($('#webp').is(':checked')) {
                    imagen = "\
                                <picture>\n\
                                    <source srcset=\"" + image_gral + ".webp\" type=\"image/webp\">\n\
                                    <source srcset=\"" + image_gral + ".jpg\" type=\"image/jpg\">\n\
                                    <img src=\"" + image_gral + ".jpg\"  loading=\"lazy\" width=\"100%\" height=\"100%\" alt=\"\">\n\
                                </picture>";
                } else {
                    imagen = '<img src="' + image_gral + '.jpg" loading="lazy" width="100%" height="100%" alt="" />';
                }

                break;
            case 3:
                image_gral = $('#ruta-custom').val();

                quitar_extension = image_gral.split('.');

                if ($('#webp').is(':checked')) {
                    imagen = "\
                                <picture>\n\
                                    <source srcset=\"" + quitar_extension[0] + ".webp\" type=\"image/webp\">\n\
                                    <source srcset=\"" + quitar_extension[0] + ".jpg\" type=\"image/jpg\">\n\
                                    <img src=\"" + quitar_extension[0] + ".jpg\"  loading=\"lazy\" width=\"100%\" height=\"100%\" alt=\"\">\n\
                                </picture>";
                } else {
                    imagen = '<img src="' + quitar_extension[0] + '.jpg" loading="lazy" width="100%" height="100%" alt="" />';
                }
                break;
            default:
                image_gral = "https://picsum.photos/seed/picsum/1800/1000";

                if ($('#webp').is(':checked')) {
                    imagen = "\
                                <picture>\n\
                                    <source srcset=\"" + image_gral + ".webp\" type=\"image/webp\">\n\
                                    <source srcset=\"" + image_gral + "\" type=\"image/jpg\">\n\
                                    <img src=\"" + image_gral + "\"  loading=\"lazy\" width=\"100%\" height=\"100%\" alt=\"\">\n\
                                </picture>";
                } else {
                    imagen = '<img src="' + image_gral + '" loading="lazy" width="100%" height="100%" alt="" />';
                }
        }


        if ($(this).val() == 3) {
            $('.custom-contain').css('display', 'block');
        } else {
            $('.custom-contain').css('display', 'none');
        }

        $('#formato-ruta-imagen').text(image_gral);
        if ($('#webp').is(':checked')) {
            $('#webp_text').text(' webp');
        } else {
            $('#webp_text').text('');
        }
    });
    //aca solo informacion para mostrar si el webp está marcado
    $('#tipo-ruta').trigger('change');
    $('#webp').on('click', function () {
        $('#tipo-ruta').trigger('change');
    });
    $('#ruta-custom').on('keyup', function () {
        $('#tipo-ruta').trigger('change');
    });


    //al enviar armamos el code
    $('form#generar-section').submit(function () {
        vista_previa = false;

        generarCodigo();

        //alert(_html);
        imprimirResultados();

        location.href = "#resultados";
        return false;
    });

    $('.vista_previa_btn').on('click', function () {
        if ($('#id_section').val() == "") {
            $('form#generar-section input[\'type="submit"\']').trigger('click');
        } else {
            vista_previa = true;

            generarCodigo();

            vistaPrevia();
        }

        return false;
    })
});


function generarCodigo() {
    _html = "";
    _css = "";
    _mobile = "";

    //tomamos todos los valores del form y los hacemos variables
    data = $('form#generar-section').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});

    id_section = 'section#' + data.id_section;

    if (vista_previa) {
        image_gral = "https://picsum.photos/seed/picsum/1800/1000";

        if ($('#webp').is(':checked')) {
            imagen = "\
                        <picture>\n\
                            <source srcset=\"" + image_gral + ".webp\" type=\"image/webp\">\n\
                            <source srcset=\"" + image_gral + "\" type=\"image/jpg\">\n\
                            <img src=\"" + image_gral + "\"  loading=\"lazy\" width=\"100%\" height=\"100%\" alt=\"\">\n\
                        </picture>";
        } else {
            imagen = '<img src="' + image_gral + '" loading="lazy" width="100%" height="100%" alt="" />';
        }
    } else {
        $('#tipo-ruta').trigger('change');
    }

    //iniciamos escritura de codigo
    html_abrirSection();

    //if (data.imagen_content) {
    crear_imagen();
    /*} else {
        crear_titulares();
    }*/

    crear_flex();

    html_cerrarSection();
}

function html_abrirSection() {
    var style = "";
    /*if (data.bg) {
        style = ' style="background-image: url(\'' + image_gral + '\')"';
    }*/
    //html
    _html += '<section id="' + data.id_section + '" class="section wow fadeIn ' + data.bg_color + ' ' + data.c_base + '"' + style + '> \n\
    <div class="'+ data.tipo_container + '" >\n';

    //css
    _css += id_section + '{\n\
        padding-top: 50px;\n\
        padding-bottom: 50px;\n\
        position: relative;\n';
    _css += '}\n' + id_section + ' .' + data.tipo_container + '{ \n}\n';

    //mobile
    _mobile += id_section + '{}\n';
    _mobile += id_section + ' .' + data.tipo_container + '{}\n';

    if (data.bg) {
        _html += '\
        <div class="bg-image">\n\
            ' + imagen + '\n\
        </div>\n';

        _css += id_section + ' .bg-image img{\n\
        display: block;\n\
        width: 100%;\n\
        height: 100%;\n\
        left: 0;\n\
        top: 0;\n\
        pointer-events: none;\n\
        object-fit: cover;\n}\n';

        if (data.bg_position == "full") {
            _css += id_section + ' .bg-image{\n\
        position: absolute;\n\
        width: 100%;\n\
        height: 100%;\n\
        left: 0;\n\
        top: 0;\n\
        z-index: 0;\n}\n';
        }
        if (data.bg_position == "izquierda") {
            _css += id_section + ' .bg-image{\n\
        position: absolute;\n\
        width: 50%;\n\
        height: 100%;\n\
        left: 0;\n\
        top: 0;\n\
        z-index: 0;\n}\n';
        }
        if (data.bg_position == "derecha") {
            _css += id_section + ' .bg-image{\n\
        position: absolute;\n\
        width: 50%;\n\
        height: 100%;\n\
        left: 50%;\n\
        top: 0;\n\
        z-index: 0;\n}\n';
        }

        _mobile += id_section + ' .bg-image{}\n';
        _mobile += id_section + ' .bg-image img{}\n';
    }
}

function html_cerrarSection() {
    _html += '\
    </div> \n\
</section> ';
}

function crear_imagen() {
    _html += '\
        <div class="flex principal-col">\n';
    if (data.imagen_content) {
        if (data.pos_imagen == "center") {
            _html += '\
            <div class="wow fadeIn">\n';
            crear_titulares();
            _html += '\
                <div class="image">\n\
                    ' + imagen + '\n\
                </div>\n\
            </div>\n';

            _css += id_section + ' .image{ \n\
                text-align: center; \n\
                padding-bottom: 30px; \n} \n\
                ' + id_section + ' .image img{ \n\
                max-width: 600px; \n}';

            _mobile += id_section + ' .image{ } \n\
                ' + id_section + ' .image img{ }';
        }
        if (data.pos_imagen == "left") {
            _html += '\
                <div class="wow fadeInLeft">\n\
                    <div class="image">\n\
                        ' + imagen + '\n\
                    </div>\n\
                </div>\n';
            _html += '\
                <div class="wow fadeInRight">\n';
            crear_titulares();
            _html += '\
                </div>\n';
        }
        if (data.pos_imagen == "right") {
            _html += '\
            <div class="wow fadeInLeft">\n';
            crear_titulares();
            _html += '\
            </div>\n';
            _html += '\
            <div class="wow fadeInRight">\n\
                <div class="image">\n\
                    ' + imagen + '\n\
                </div>\n\
            </div>\n';
        }
    } else {
        _html += '\
            <div class="wow fadeIn">\n';
        crear_titulares();
        _html += '\
            </div>\n';
    }

    _html += '\
        </div>\n';

    _css += id_section + ' .flex.principal-col{ \n\
        position: relative;\n\
        z-index: 1;\n} \n\
' + id_section + ' .image{ \n\
        padding-bottom: 30px; \n} \n\
' + id_section + ' .image img{  \n\
        max-width: 600px; \n} \n\
' + id_section + ' .flex.principal-col > div{ \n}\n\
' + id_section + ' .flex.principal-col > div:nth-child(1){ \n}\n\
' + id_section + ' .flex.principal-col > div:nth-child(2){ \n}\n';

    _mobile += id_section + ' .flex.principal-col{ } \n';
    _mobile += id_section + ' .flex.principal-col > div{ }\n';
    _mobile += id_section + ' .flex.principal-col > div:nth-child(1){ }\n';
    _mobile += id_section + ' .flex.principal-col > div:nth-child(2){ }\n';
}

function crear_titulares() {
    if (data.sup_icon) {
        _html += '\
                <div class="icon">\n\
                    ' + imagen + '\n\
                </div>\n';

        _css += id_section + ' .icon{ \n\
        text-align:center \n}\n';
        _css += id_section + ' .icon img{ \n\
        height: 60px; \n\
        object-fit: contain; \n}\n';

        _mobile += id_section + ' .icon{}\n';
        _mobile += id_section + ' .icon img{}\n';
    }

    if (data.sup_titulo) {
        _html += '\
                <div class="sup_titulo">\n\
                    ' + data.sup_titulo + '\n\
                </div>\n';

        _css += id_section + ' .sup_titulo{ \n\
        font-size: 0.7rem; \n\
        padding-bottom: 10px; \n\
        text-align:center; \n}\n';

        _mobile += id_section + ' .sup_titulo{}'
    }

    if (data.titulo) {
        _html += '\
                <div class="title">\n\
                    ' + data.titulo + '\n\
                </div>\n';

        _css += id_section + ' .title{ \n\
        font-weight:600; \n\
        padding-bottom: 20px; \n\
        text-align:center; \n}\n';
        _css += id_section + ' .title:before{ \n\
        content: ""; \n}\n';

        _mobile += id_section + ' .title{}';
    }

    if (data.subtitulo) {
        _html += '\
                <div class="subtitle">\n\
                    ' + data.subtitulo + '\n\
                </div>\n';

        _css += id_section + ' .subtitle{ \n\
        padding-bottom: 20px; \n\
        text-align:center; \n}\n';

        _mobile += id_section + ' .subtitle{}\n';
    }

    if (data.texto) {
        _html += '\
                <div class="text">\n\
                    ' + data.texto + '\n\
                </div>\n';

        _css += id_section + ' .text{ \n\
        max-width: 600px; \n\
        margin: 0 auto; \n\
        text-align:center; \n\
        padding-bottom: 40px; \n}\n';

        _mobile += id_section + ' .text{}';
    }

    if (data.btn) {
        _html += '\
                <div class="action">\n\
                    <a href="#" class="btn btn-primary">\n\
                        ' + data.btn + '\n\
                    </a>\n\
                </div>\n';

        _css += id_section + ' .action{ \n\
        text-align: center; \n}\n';
        _css += id_section + ' .action .btn{\n}\n';

        _mobile += id_section + ' .action{}\n';
        _mobile += id_section + ' .action .btn{}\n';
    }


}

function crear_flex() {
    if (data.columnas_flex != 0) {
        _html += '\
        <div class="items-' + data.id_section + ' flex t-col-' + data.columnas_flex + '">\n';

        _css += id_section + ' .items-' + data.id_section + '{ \n}\n';
        _css += id_section + ' .items-' + data.id_section + ' .item{\n}\n';
        _css += id_section + ' .items-' + data.id_section + ' .bg{ \n\
        background-color: ' + data.bg_flex + ' \n}\n';

        _mobile += id_section + ' .items-' + data.id_section + '{ }\n';
        _mobile += id_section + ' .items-' + data.id_section + ' .item{}\n';
        _mobile += id_section + ' .items-' + data.id_section + ' .bg{ }\n';

        for (let index = 1; index <= data.columnas_flex; index++) {
            _html += '\
            <div class="item">\n\
                <div class="bg">\n';

            if (data.icono_flex) {
                _html += '\
                    <div class="icono_flex">\n\
                        ' + imagen + '\n\
                    </div>\n';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .icono_flex{ \n\
        padding-bottom: 20px; \n\
        text-align:center; \n}\n ';

                    _css += id_section + ' .items-' + data.id_section + ' .icono_flex img{ \n\
        height: 60px; \n\
        object-fit: contain \n}\n';

                    _mobile += id_section + ' .items-' + data.id_section + ' .icono_flex{}\n';
                    _mobile += id_section + ' .items-' + data.id_section + ' .icono_flex img{}\n';
                }
            }
            if (data.imagen_flex) {
                if (data.imagen_link_flex) {
                    _html += '\
                    <div class="imagen_flex">\n\
                        <a href="#">\n\
                            ' + imagen + '\n\
                        </a>\n\
                    </div>\n';
                } else {
                    _html += '\
                    <div class="imagen_flex">\n\
                        ' + imagen + '\n\
                    </div>\n';
                }

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .imagen_flex{ \n}\n';

                    if (data.imagen_link_flex) {
                        _css += id_section + ' .items-' + data.id_section + ' .imagen_flex a{ \n\
        display:block; \n}\n';
                        _css += id_section + ' .items-' + data.id_section + ' .imagen_flex a:hover{ \n\
        filter: brightness(0.7) \n}\n';
                    }

                    _css += id_section + ' .items-' + data.id_section + ' .imagen_flex img{ \n\
        height: 280px; \n\
        object-fit: cover; \n\
        width: 100% \n}\n';

                    _mobile += id_section + ' .items-' + data.id_section + ' .imagen_flex{}\n';
                    _mobile += id_section + ' .items-' + data.id_section + ' .imagen_flex img{}\n';
                }
            }
            if (data.titulo_flex) {
                _html += '\
                    <div class="titulo_flex">\n\
                        _TITULO_\n\
                    </div>\n';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .titulo_flex{ \n\
        padding-bottom: 10px \n}\n';

                    _mobile += id_section + ' .items-' + data.id_section + ' .titulo_flex{}\n';
                }
            }
            if (data.subtitulo_flex) {
                _html += '\
                    <div class="subtitulo_flex">\n\
                        _SUBTITULO_\n\
                    </div>\n';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .subtitulo_flex{ \n\
        font-size: 0.7rem; \n\
        padding-bottom: 10px \n}\n';

                    _mobile += id_section + ' .items-' + data.id_section + ' .subtitulo_flex{}\n';
                }
            }
            if (data.texto_flex) {
                _html += '\
                    <div class="texto_flex">\n\
                        _TEXTO_\n\
                    </div>\n';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .texto_flex{ \n\
        font-size: 0.7rem; \n\
        padding-bottom: 10px \n}\n';

                    _mobile += id_section + ' .items-' + data.id_section + ' .texto_flex{}';
                }
            }
            if (data.btn_flex) {
                _html += '\
                    <a href="#" class="btn btn-primary">\n\
                        _BOTON_\n\
                    </a>\n';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .btn{ \n\
        font-size: 0.7rem; \n\
        padding-bottom: 10px \n}\n';

                    _mobile += id_section + ' .items-' + data.id_section + ' .btn{}\n';
                }
            }
            _html += '\
                </div>\n\
            </div>\n';
        }

        _html += '\
        </div>\n';
    }
}

function imprimirResultados() {
    var abrir_mobile = '@media screen and (max-width:900px){\n';
    var cerrar_mobile = '}';

    $('#resultados #res-html').val(_html);
    $('#resultados #res-css').val(_css + abrir_mobile + _mobile + cerrar_mobile);
}

function vistaPrevia() {
    var abrir_mobile = '@media screen and (max-width:900px){\n';
    var cerrar_mobile = '}';

    $('#previa_html').html(_html);
    $('#previa_css').html('<style>' + _css + abrir_mobile + _mobile + cerrar_mobile + '</style>');

    $('#generar-codigo-modal').click(function () {
        $('.close.close-btn').trigger('click');
        $('form#generar-section').trigger('submit');
    });

    $('#cerrar-modal').click(function () {
        $('.close.close-btn').trigger('click');
    });
}
