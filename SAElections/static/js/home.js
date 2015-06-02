// Requires jQuery
if (typeof jQuery === 'undefined') {
    throw new Error('This web app requires jQuery.');
}

$(document).ready(function() {
    $(['castillejos', 'bismark', 'latorre',
       'sevilla', 'limsiaco', 'ecaldre', 'voting-button']).each(function(index) {
        $('#' + this.toString()).delay(((index++) * 1000) + 500).fadeIn(1000);
    });
    $('.vote-label').css('display', 'none');

    $('.candid').hover(
        function() { // When mouse is over element
            $(this).animate({
                backgroundColor: '#fff',
                borderColor: '#313131',
                borderStyle: 'solid',
                color: '#313131'
            }, 'slow');
        },
        function() { // When mouse is out of the element
            $(this).animate({
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderStyle: 'none',
                color: '#fff'
            }, 'slow');
        }
    );
});