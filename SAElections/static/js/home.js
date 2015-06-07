'use strict';

/////////////////////////////////////////////
///                                       ///
///   Javascipt file for the vote page.   ///
///   DO NOT CHANGE ANYTHING UNLESS YOU   ///
///   KNOW WHAT YOU ARE DOING!!!          ///
///                                       ///
/////////////////////////////////////////////

// Requires jQuery
if (typeof jQuery === 'undefined') {
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

    // TODO: Search in the net why .hover doesn't accept a function as a parameter and why
    // a function suddenly runs inside .hover without function() {} in the .hover
    // parameters.
    // Handles hover on an image
    $('#johan').hover( // Executes when mouse is over or out of Johan's picture
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

////////////////////////////////////////
///                                  ///
///   Helper functions for home.js   ///
///                                  ///
////////////////////////////////////////

/**
 * Changes the background-position of an element
 * @param  string  elem                Element in which its *background-position* will be changed.
 * @param  string  hoverState          State of mouse whether it is over or out *elem*. *hoverState* may be **mouseover** or **mouseout**.
 * @param  Array   candidateArray      Array to be used
 * @param  int     candidateIndex      Index of the array that will point to the value inside of the array that will be used.
 * @param  string  backgroundPosition1 *background-position* when the image will be clicked. Example, '0 -128px'.
 * @param  string  backgroundPosition2 *background-position* when the image will be unclicked. Example, '0 0'.
 */
function changeBackgroundPositionOnHover(elem, hoverState, candidateArray, candidateIndex, backgroundPosition1, backgroundPosition2) {
    console.log('Hovered?');
    console.log('Info: elem is ' + elem);
    console.log('Info: hoverState is ' + hoverState);
    console.log('Info: candidateArray is ' + candidateArray.toString());
    console.log('Info: candidateIndex is ' + candidateIndex.toString());
    console.log('Info: backgroundPosition1 is ' + backgroundPosition1);
    console.log('Info: backgroundPosition2 is ' + backgroundPosition2);
    var elem_to_be_modified = document.querySelector(elem);
    console.log('Info: elem_to_be_modified is ' + elem_to_be_modified);
    switch (hoverState) {
        case 'mouseover':
            if (!candidateArray[candidateIndex]) { // Image has not been clicked yet, or unclicked
                $(elem_to_be_modified).css('background-position', backgroundPosition1);
                console.log('Hi!');
            } else { // Image has been clicked
                $(elem_to_be_modified).css('background-position', backgroundPosition2);
            }
        case 'mouseout':
            if (!candidateArray[candidateIndex]) { // Image has not been clicked yet, or unclicked
                $(elem_to_be_modified).css('background-position', backgroundPosition1);
            } else { // Image has been clicked
                $(elem_to_be_modified).css('background-position', backgroundPosition2);
            }
    }
}