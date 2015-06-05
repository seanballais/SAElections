/*
 * Javascipt file for the home page.
 * DO NOT CHANGE UNLESS YOU KNOW
 * WHAT YOU ARE REALLY DOING!!!
 */

// Requires jQuery
if (typeof jQuery === 'undefined') {
    throw new Error('This web app requires jQuery.');
}

/**
 * Holds the state of the candidates to know
 * whether they have been voted or not
 * @type Array
 */
var candidState = [false, false, false, false, false, false]; // Contains selection status (voted or not)

/**
 * The 'main' function
 * @param function
 */
$(document).ready(function() {
    pageInit();
    pageHovers();
    pageClicks();
});

/**
 * Initializes variables or effects that have to run
 * when the page is ready.
 */
function pageInit() {
    /* 
     * Fade in the candidates with Johan fading in first
     * then Kobe and so one then the voting buttons
     */
    $(['castillejos', 'bismark', 'latorre', 
       'sevilla', 'limsiaco', 'ecaldre', 'voting-button']).each(function(index) {
        $('#' + this.toString()).delay(((index++) * 1000) + 500).fadeIn(1000);
    });
}
/**
 * Handles everything regarding hover actions
 */
function pageHovers() {
    // Generic candidate hover handler
    $('.candid').hover(
        function() { // When mouse is over the element
            $(this).animate({
                backgroundColor: '#fff',
                color: '#313131'
            }, 'fast');
        },
        function() { // When mouse is out of the element
            $(this).animate({
                backgroundColor: 'transparent',
                color: '#fff'
            }, 'fast');
        }
    );

    // Handles hover on an image
    /**$('#johan').hover( // Executes when mouse is over Johan's picture
        function() { // When mouse is over the element
            // Image has not been clicked, or has been unclicked
            if (candidState[0] == false) { $(this).css('background-position', '0 -128px'); }
            // Image has been clicked
            else { $(this).css('background-position', '0 -256px') }
        },
        function() { // When mouse is out of the element
            // Image has not been clicked, or has been unclicked
            if (candidState[0] == false) { $(this).css('background-position', '0 0'); }
            // Image has been clicked
            else { $(this).css('background-position', '0 -128px'); }
        }
    );*/
}

/**
 * Handles everything regarding click actions
 */
function pageClicks() {
    $('#johan').click(function() { // Executes when Johan's picture has been clicked
        if (candidState[0] == false) { // Image has not been clicked, or has been unclicked
            candidState[0] = true;
            $(this).css('background-position', '0 -128px');
        } else { // Image has been clicked already
            candidState[0] = false;
            $(this).css('background-position', '0 0');
        }
    });
}