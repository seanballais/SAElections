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

/// Abstraction functions for the candidate variable to somehow
/// simulate object-oriented programming.

/**
 * Gets the candidate's first name based on his/her family name.
 * @param  Array   surnameArray Array where the value possibly is.
 * @param  string  surname      Surname of the candidate.
 * @return string               The candidate's first name.
 */
function getCandidateFirstName(surnameArray, surname)
{
    return getCandidateInfo(surnameArray, 1, surname);
}

/**
 * Gets the candidate's reverse vote status.
 * @param  Array   surnameArray Array where the value possibly is.
 * @param  string  surname      Surname of the candidate.
 * @return string               The candidate's reverse vote status. It can either be *'voted'* or *'unvoted'*.
 */
function getCandidateReverseVoteState(surnameArray, surname)
{
    return getCandidateState(surnameArray, 2, surname, ['vote', 'unvote']);
}

/**
 * Gets the candidate's gender.
 * @param  Array   surnameArray Array where the value possibly is.
 * @param  string  surname      Surname of the candidate.
 * @return string               The candidate's gender.
 */
function getCandidateGender(surnameArray, surname)
{
    return getCandidateState(surnameArray, 3, surname, ['her', 'him']);
}

/**
 * Gets the candidate's info state whether it is 0 or false, etc.
 * @param  Array        surnameArray Array where the value possibly is.
 * @param  int          arrayIndex   The index where the information will be gathered from.
 * @param  string       surname      Surname of the candidate.
 * @param  Array        returnVal    Values that should be returned.
 * @return int/boolean               Values that should be returned depending on whether it is *true* or *false*.
 */
function getCandidateState(surnameArray, arrayIndex, surname, returnVal)
{
    if (!getCandidateInfo(surnameArray, arrayIndex, surname)) { // Value received is either 0 or false
        return returnVal[0];
    } else { // Value received is either 1 or true
        return returnVal[1];
    }
}

/**
 * Gets the candidate info (first name, gender, etc.)
 * @param  Array               infoArray Array where the value possibly is.
 * @param  int                 infoIndex The index where the information will be gathered from
 * @param  string              surname   Surname that will be used in getCandidateInfo().
 * @return string/boolean/int            The information that wiil be used.
 */
function getCandidateInfo(infoArray, infoIndex, surname)
{
    var candidateIndex = getSurnameIndex(infoArray, surname); // Get the index of the surname

    return infoArray[infoIndex][candidateIndex]; // Returns candidate info
}

/**
 * Loops through each surname value until it finds a match to the given surname from the parameter.
 * @param  Array  infoArray Array where the value possibly is.
 * @param  string surname   Surname where the index that will be gathered from the array will be based on.
 * @return int              The index of the surname.
 */
function getSurnameIndex(infoArray, surname) 
{    
    for (var index = 0; index < 6; index++) {
        var candidateVal = infoArray[0][index];

        if (candidateVal == surname) {
            return index;
        } else {
            throw new Error('Surname (' + surname + ') not found.');
        }
    }
}

/// Functions for website functionality

/**
 * Changes text on hover with a fade effect.
 * @param  string      elem        Element that is holding the text.
 * @param  string      text        Text that will be replacing the old text in the specified element, *elem*.
 * @param  string      textColor   Color in which the text will be colored into.
 * @param  string      fadeEffect  Fade effect to be used when changing text. Can be *fadeIn* or *fadeOut*.
 * @param  string,int  effectSpeed Speed of the effect. If *effectSpeed* is a string, parameter can be *fast* or *slow*. Any positive number can be used if *effectSpeed* is an integer.
 */
function changeTextOnHoverWithEffect(elem, text, textColor, fadeEffect, effectSpeed) 
{
    var elemToBeModified = document.querySelector(elem);

    $(elemToBeModified).text(text);
    $(elemToBeModified).animate({ color: textColor }, effectSpeed);

    if (fadeEffect == 'fadeIn') { 
        $(elemToBeModified).fadeIn(effectSpeed);
    } else if (fadeEffect == 'fadeOut') {
        $(elemToBeModified).fadeOut(effectSpeed); 
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
function changeBackgroundPositionOnHover(elem, hoverState, candidateArray, candidateIndex, backgroundPosition1, backgroundPosition2)
{
    var elemToBeModified = document.querySelector(elem);
    switch (hoverState) {
        case 'mouseover':
            if (!candidateArray[candidateIndex]) { // Image has not been clicked yet, or unclicked
                $(elemToBeModified).css('background-position', backgroundPosition1);
            } else { // Image has been clicked
                $(elemToBeModified).css('background-position', backgroundPosition2);
            }
        case 'mouseout':
            if (!candidateArray[candidateIndex]) { // Image has not been clicked yet, or unclicked
                $(elemToBeModified).css('background-position', backgroundPosition1);
            } else { // Image has been clicked
                $(elemToBeModified).css('background-position', backgroundPosition2);
            }
    }
}