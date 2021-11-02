var _html = "";
var _css = "";
var _mobile = "";
var data = "";
var id_section = "";
var tipo_ruta = "";
var image_gral = "";

$(function () {

    $('form#generar-section').submit(function () {
        _html = "";
        _css = "";
        _mobile = "";

        //tomamos todos los valores del form y los hacemos variables
        data = $('form#generar-section').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        id_section = '#' + data.id_section;
        tipo_ruta = parseInt($('#tipo-ruta').val());

        //aplicar ruta de imagen, una imagen para todo
        switch (tipo_ruta) {
            case 1:
                image_gral = "{{ 'assets/img/logo.svg'|theme }}";
                break;
            case 2:
                image_gral = "https://picsum.photos/seed/1800/1000";
                break;
            default:
                image_gral = "https://picsum.photos/seed/1800/1000";
        }

        html_abrirSection();

        if (data.imagen_content) {
            crear_imagen();
        } else {
            crear_titulares();
        }

        crear_flex();

        html_cerrarSection();

        //alert(_html);
        imprimirResultados();
        return false;
    });
});

function html_abrirSection() {
    var style = "";
    if (data.bg) {
        style = ' style="background-image: url(\'' + image_gral + '\')"';
    }
    //html
    _html += '<section id="' + data.id_section + '" class="section wow fadeIn ' + data.bg_color + ' ' + data.c_base + '"' + style + '> \
        <div class="'+ data.tipo_container + '" > ';

    //css
    _css += id_section + '{\
        padding-top: 100px;\
        padding-bottom: 100px;';

    if (style) {
        _css += 'background-position: center;\
		background-repeat: no-repeat;\
		background-size: cover;';
    }

    _css += '}\
    '+ id_section + ' .' + data.tipo_container + '{}';

    //mobile
    _mobile += id_section + '{}\
    '+ id_section + ' .' + data.tipo_container + '{}';
}

function html_cerrarSection() {
    _html += '</div> \
    </section > ';
}

function crear_imagen() {
    //center funciona distinto a las otras, revisar ambar condiciones por las dudas
    if (data.pos_imagen == "center") {
        crear_titulares();
        _html += '<div class="image"><img src="' + image_gral + '"></div>';

        _css += id_section + ' .image{ text-align: center; padding-bottom: 30px; } ' + id_section + ' .image img{ max-width: 600px; }';

        _mobile += id_section + ' .image{ } ' + id_section + ' .image img{ }';
    } else {
        _html += '<div class="flex principal-col">';
        if (data.pos_imagen == "left") {
            _html += '<div class="wow fadeInLeft"><div class="image"><img src="' + image_gral + '" /></div></div>';
            _html += '<div class="wow fadeInRight">';
            crear_titulares();
            _html += '</div>';
        }
        if (data.pos_imagen == "right") {
            _html += '<div class="wow fadeInLeft">';
            crear_titulares();
            _html += '</div>';
            _html += '<div class="wow fadeInRight"><div class="image"><img src="' + image_gral + '" /></div></div>';
        }
        _html += '</div>';

        _css += id_section + ' .flex.principal-col{ } ' + id_section + ' .image{ padding-bottom: 30px; } ' + id_section + ' .image img{  max-width: 600px; } ' + id_section + ' .flex.principal-col > div{ }' + id_section + ' .flex.principal-col > div:nth-child(1){ }' + id_section + ' .flex.principal-col > div:nth-child(2){ }';

        _mobile += id_section + ' .flex.principal-col{ } ' + id_section + ' .flex.principal-col > div{ }' + id_section + ' .flex.principal-col > div:nth-child(1){ }' + id_section + ' .flex.principal-col > div:nth-child(2){ }';
    }
}

function crear_titulares() {
    if (data.sup_icon) {
        _html += '<div class="icon"><img src="' + image_gral + '" /></div>';

        _css += id_section + ' .icon{ text-align:center }' + id_section + ' .icon img{ height: 60px; object-fit: contain }';

        _mobile += id_section + ' .icon{}' + id_section + ' .icon img{}';
    }

    if (data.sup_titulo) {
        _html += '<div class="sup_titulo">' + data.sup_titulo + '</div>';

        _css += id_section + ' .sup_titulo{ font-size: 0.7rem; padding-bottom: 10px; text-align:center; }';

        _mobile += id_section + ' .sup_titulo{}'
    }

    if (data.titulo) {
        _html += '<div class="title">' + data.titulo + '</div>';

        _css += id_section + ' .title{ font-weight:600; padding-bottom: 20px; text-align:center; }' + id_section + ' .title:before{ content: ""; }';

        _mobile += id_section + ' .title{}';
    }

    if (data.subtitulo) {
        _html += '<div class="subtitle">' + data.subtitulo + '</div>';

        _css += id_section + ' .subtitle{ padding-bottom: 20px; text-align:center; }';

        _mobile += id_section + ' .subtitle{}';
    }

    if (data.texto) {
        _html += '<div class="text">' + data.texto + '</div>';

        _css += id_section + ' .text{ max-width: 600px; margin: 0 auto; text-align:center; padding-bottom: 40px; }';

        _mobile += id_section + ' .text{}';
    }

    if (data.btn) {
        _html += '<div class="action"><a href="#" class="btn btn-primary">' + data.btn + '</a></div>';

        _css += id_section + ' .action{ text-align: center; }' + id_section + ' .action .btn{}';

        _mobile += id_section + ' .action{ }' + id_section + ' .action .btn{}';
    }


}

function crear_flex() {
    if (data.columnas_flex != 0) {
        _html += '<div class="items-' + data.id_section + ' flex t-col-' + data.columnas_flex + '">';

        _css += id_section + ' .items-' + data.id_section + '{ }' + id_section + ' .items-' + data.id_section + ' .item{}' + id_section + ' .items-' + data.id_section + ' .bg{ background-color: ' + data.bg_flex + ' }';

        _mobile += id_section + ' .items-' + data.id_section + '{ }' + id_section + ' .items-' + data.id_section + ' .item{}' + id_section + ' .items-' + data.id_section + ' .bg{ }';

        for (let index = 1; index <= data.columnas_flex; index++) {
            _html += '<div class="item">\
                <div class="bg">';

            if (data.icono_flex) {
                _html += '<div class="icono_flex"><img src="' + image_gral + '" /></div>';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .icono_flex{ padding-bottom: 20px; text-align:center; } ' + id_section + ' .items-' + data.id_section + ' .icono_flex img{ height: 60px; object-fit: contain }';

                    _mobile += id_section + ' .items-' + data.id_section + ' .icono_flex{}' + id_section + ' .items-' + data.id_section + ' .icono_flex img{}';
                }
            }
            if (data.imagen_flex) {
                _html += '<div class="imagen_flex"><a href="#"><img src="' + image_gral + '" /></a></div>';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .imagen_flex{ }' + id_section + ' .items-' + data.id_section + ' .imagen_flex a{ display:block; }' + id_section + ' .items-' + data.id_section + ' .imagen_flex a:hover{ filter: brightness(0.7) }' + id_section + ' .items-' + data.id_section + ' .imagen_flex img{ height: 280px; object-fit: cover; width: 100% }';

                    _mobile += id_section + ' .items-' + data.id_section + ' .imagen_flex{}' + id_section + ' .items-' + data.id_section + ' .imagen_flex img{}';
                }
            }
            if (data.titulo_flex) {
                _html += '<div class="titulo_flex">_TITULO_</div>';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .titulo_flex{ padding-bottom: 10px }';

                    _mobile += id_section + ' .items-' + data.id_section + ' .titulo_flex{}';
                }
            }
            if (data.subtitulo_flex) {
                _html += '<div class="subtitulo_flex">_SUBTITULO_</div>';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .subtitulo_flex{ font-size: 0.7rem; padding-bottom: 10px }';

                    _mobile += id_section + ' .items-' + data.id_section + ' .subtitulo_flex{}';
                }
            }
            if (data.texto_flex) {
                _html += '<div class="texto_flex">_TEXTO_</div>';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .texto_flex{ font-size: 0.7rem; padding-bottom: 10px }';

                    _mobile += id_section + ' .items-' + data.id_section + ' .texto_flex{}';
                }
            }
            if (data.btn_flex) {
                _html += '<a href="#" class="btn btn-primary">_BOTON_</a>';

                if (index == 1) {
                    _css += id_section + ' .items-' + data.id_section + ' .btn{ font-size: 0.7rem; padding-bottom: 10px }';

                    _mobile += id_section + ' .items-' + data.id_section + ' .btn{}';
                }
            }
            _html += '</div>\
            </div>';
        }

        _html += '</div>';






    }
}

function imprimirResultados() {
    var abrir_mobile = '@media screen and (max-width:900px){';
    var cerrar_mobile = '}';

    $('#resultados #res-html').val(_html);
    $('#resultados #res-css').val(_css + abrir_mobile + _mobile + cerrar_mobile);
}

