'use strict';

if (typeof jQuery === 'undefined') { // Requiring jQuery
    throw new Error('This web app requires jQuery.');
}

////////////////////////////////////////
///                                  ///
///   Helper functions for home.js   ///
///   DO NOT CHANGE ANYTHING UNLESS  ///
///   YOU KNOW WHAT YOU ARE DOING    ///
///                                  ///
////////////////////////////////////////

/**
 * Changes text on hover with a fade effect.
 * @param  string      elem        Element that is holding the text.
 * @param  string      text        Text that will be replacing the old text in the specified element, *elem*.
 * @param  string      fadeEffect  Fade effect to be used when changing text. Can be *fadeIn* or *fadeOut*.
 * @param  string,int  effectSpeed Speed of the effect. If *effectSpeed* is a string, parameter can be *fast* or *slow*. Any positive number can be used if *effectSpeed* is an integer.
 */
function changeTextOnHoverWithEffect(elem, text, fadeEffect, effectSpeed) {
    var elem_to_be_modified = document.querySelector(elem);

    $(elem_to_be_modified).text(text);

    if (fadeEffect == 'fadeIn') { 
        $(elem_to_be_modified).fadeIn(effectSpeed);
    } else if (fadeEffect == 'fadeOut') {
        $(elem_to_be_modified).fadeOut(effectSpeed); 
    }
}

/**
 * Changes the background-position of an element on mouse hover.
 * @param  string  elem                Element in which its *background-position* will be changed.
 * @param  string  hoverState          State of mouse whether it is over or out *elem*. *hoverState* may be **mouseover** or **mouseout**.
 * @param  Array   candidateArray      Array to be used. Must be a boolean array.
 * @param  int     candidateIndex      Index of the array that will point to the value inside of the array that will be used.
 * @param  string  backgroundPosition1 *background-position* when the image will be clicked. Example, '0 -128px'.
 * @param  string  backgroundPosition2 *background-position* when the image will be unclicked. Example, '0 0'.
 */
function changeBackgroundPositionOnHover(elem, hoverState, candidateArray, candidateIndex, backgroundPosition1, backgroundPosition2) {
    var elem_to_be_modified = document.querySelector(elem);
    switch (hoverState) {
        case 'mouseover':
            if (!candidateArray[candidateIndex]) { // Image has not been clicked yet, or unclicked
                $(elem_to_be_modified).css('background-position', backgroundPosition1);
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

/**
 * Returns whether to use the word vote or unvote when hovering over a candidate's div block.
 * @param   Array   candidateArray Array where the click state will be based on.
 * @param   int     candidateIndex Index of the candidate in *candidateArray*.
 * @return  string                 It can either be 'vote' or 'unvote'.
 */
function votingStatus(candidateArray, candidateIndex) {
    if (!candidateArray[candidateIndex]) { // Image has not been clicked
        return 'vote';
    } else { // Image has been clicked
        return 'unvote';
    }
}