'use strict';

/////////////////////////////////////////////
///                                       ///
///   Javascipt file for the vote page.   ///
///   DO NOT CHANGE ANYTHING UNLESS YOU   ///
///   KNOW WHAT YOU ARE DOING!!!          ///
///                                       ///
/////////////////////////////////////////////

if (typeof jQuery === 'undefined') { // Requiring jQuery
    throw new Error('This web app requires jQuery.');
}

/**
 * Holds the state of the candidates to know
 * whether they have been voted or not.
 * @type Array
 */
var candidState = [false, false, false, false, false, false]; // Contains selection status (voted or not).

/**
 * The 'main' function.
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
     * then Kobe and so one then the voting buttons.
     */
    $(['castillejos', 'bismark', 'latorre', 
       'sevilla', 'limsiaco', 'ecaldre', 'voting-button']).each(function(index) {
        $('#' + this.toString()).delay(((index++) * 1000) + 500).fadeIn(1000);
    });
}

/**
 * Handles everything regarding hover actions.
 */
function pageHovers() {
    $('.candid').hover( // Generic candidate hover handler
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

    $('#castillejos').hover( // Handles hover on Johan's div block
        function() { // Executes when mouse is over Johan's div block
            $('#johan-click').text('Click Handsome Johan to vote him.');
            $('#johan-click').fadeIn('fast');
        },
        function() { // Executes when mouse is out of Johan's div block
            $('#johan-click').text('...');
            $('#johan-click').fadeOut('fast');
        }
    );

    // TODO: Search in the net why .hover doesn't accept a function as a parameter and why
    // a function suddenly runs inside .hover without function() {} in the .hover
    // parameters.
    $('#johan').hover( // Handles hover on Johan's image
        function() {
            changeBackgroundPositionOnHover('#johan', 'mouseover', candidState, 0, '0 -128px', '0 -256px');
        },
        function() {
            changeBackgroundPositionOnHover('#johan', 'mouseout', candidState, 0, '0 0', '0 -128px');
        }
    );
}

/**
 * Handles everything regarding click actions.
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