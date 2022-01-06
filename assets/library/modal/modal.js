/* ******************************* */
/* *******************************
Developed: by Cristo
v: 2.0.0
Required:
Jquery
/* ******************************* */
/* ******************************* */
$('div.modal').hide();
$(function () {
    //black bg init
    $('body').append('<div class="black-bg"></div>');
    $('.black-bg').css({
        'display': 'none',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '100vw',
        'height': '100vh',
        'background-color': 'rgba(0,0,0,0.8)',
        'cursor': 'pointer',
        'z-index': '99998'
    });
    $('body').append('<style> \
         .modal{\
            background-color: #fff;\
            -webkit-border-radius: 7px;\
            border-radius: 7px;\
            padding: 40px;\
            position: fixed;\
            left: 50%;\
            top: 50%;\
            transform: translate(-50%,-50%);\
            width: calc(100% + -40px);\
            max-width: 600px;\
            z-index: 99999;\
         }\
         .modal .close-btn{\
            font-weight: 900;\
            font-size: 24px;\
            font-family: sans-serif;\
            cursor: pointer;\
            position: absolute;\
            right: 20px;\
            top: 15px;\
            color: #aeaeae;\
            text-decoration: none;\
         }\
         .content-modal{\
            overflow:auto;\
            max-height: 80vh;\
         }\
        </style>');
    $('div.modal').each(function (index, el) {
        var cont = $(this).html();
        $(this).html('<div class="header-modal"><a class="close close-btn" href="#">&times;</a></div><div class="content-modal">' + cont + '</div>');
    });
    $('.modal-link').click(function (event) {
        selector = $(this).attr('data-href');
        yt = $(this).attr('data-youtube');

        if (yt) {
            addYouTube(selector, yt);
        }

        openModal(selector);
        return false;
    });
});
function openModal(selector) {
    $(selector).addClass('open');
    $(selector).fadeIn('fast');
    $('.black-bg').fadeIn('fast');

    $(document).delegate('.modal .close.close-btn, .black-bg', 'click', function (event) {
        closeModal();
        return false;
    });
    //se puede dar close a cualquier boton del modal, pero le sacamos el return false para que actue libremente
    $(document).delegate('.modal .close', 'click', function (event) {
        closeModal();
    });
}
function addYouTube(selector, idyoutube) {
    var cont = '<div class="videoWrapper">\
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/'+ idyoutube + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\
    </div>';
    $(selector).html('<div class="header-modal"><a class="close close-btn" style>X</a></div><div class="content-modal">' + cont + '</div>');
}
function closeModal() {
    $('div.modal.open').fadeOut('fast');
    $('.black-bg').fadeOut('fast');
    $('div.modal .videoWrapper').remove();
    $('div.modal.open').removeClass('open');
}
