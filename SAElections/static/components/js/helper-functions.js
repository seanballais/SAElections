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
 * @param  string  String       Surname of the candidate.
 * @param  Array   surnameArray Array where the value possibly is.
 * @return string               The candidate's first name.
 */
String.prototype.getCandidateFirstName = 
    function(surnameArray)
    {
        return this.getCandidateInfo(surnameArray, 1);
    }
;

/**
 * Gets the candidate's initial background position
 * @param  string  String       Surname of the candidate
 * @param  Array   surnameArray Array where the value possibly is.
 * @return string               The initial background position of the candidate.
 */
String.prototype.getCandidateInitBgPos =
    function(surnameArray)
    {
        return this.getCandidateInfo(surnameArray, 0, 4);
    }
;

/**
 * Gets the candidate's background position where a check mark is over the candidate's image.
 * @param  string  String       Surname of the candidate
 * @param  Array   surnameArray Array where the value possibly is.
 * @return string               The candidate's background position where a check mark is over the candidate's image.
 */
String.prototype.getCandidateCheckBgPos = 
    function(surnameArray)
    {
        return this.getCandidateInfo(surnameArray, 1, 4);
    }
;

/**
 * Gets the candidate's background position where a cross mark is over the candidate's image.
 * @param  string  String       Surname of the candidate
 * @param  Array   surnameArray Array where the value possibly is.
 * @return string               The candidate's background position where a cross mark is over the candidate's image
 */
String.prototype.getCandidateCrossBgPos =
    function(surnameArray)
    {
        return this.getCandidateInfo(surnameArray, 2, 4);
    }
;

/**
 * Gets the candidate's info state whether it is 0 or false, etc.
 * @param  string       String       Surname of the candidate.
 * @param  Array        surnameArray Array where the value possibly is.
 * @param  int          arrayIndex   The index where the information will be gathered from.
 * @param  Array        returnVal    Values that should be returned.
 * @return int/boolean               Values that should be returned depending on whether it is *true* or *false*.
 */
String.prototype.getCandidateState = 
    function(surnameArray, arrayIndex, returnVal)
    {
        if (!this.getCandidateInfo(surnameArray, arrayIndex)) { // Value received is either 0 or false
            return returnVal[0];
        } else { // Value received is either 1 or true
            return returnVal[1];
        }
    }
;

/**
 * Gets the candidate info (first name, gender, etc.)
 * @param  string              String      Surname that will be used in getCandidateInfo().
 * @param  Array               infoArray   Array where the value possibly is.
 * @param  int                 infoIndex   The index where the information will be gathered from.
 * @param  int                 infoMdIndex The index where the information will be gathered from if the data is in a multidimensional array.
 * @return string/boolean/int              The information that wiil be used.
 */
String.prototype.getCandidateInfo = 
    function(infoArray, infoIndex, infoMdIndex)
    {
        var isUsingThreeDimensions = (infoMdIndex > -1) ? true : false;

        for (var index = 0; index < 6; index++) { // Get candidate index
            var candidateVal = infoArray[0][index];

            if (candidateVal == this.toString() && !isUsingThreeDimensions) {
                return infoArray[infoIndex][index]; // Returns candidate info
            } else if (candidateVal == this.toString() && isUsingThreeDimensions) {
                return infoArray[infoMdIndex][infoIndex][index]; // Returns candidate info
            }
        }

        throw new Error('Surname (' + this.toString() + ') not found.');
    }
;

/// Functions for website functionality

/**
 * Changes the background position.
 * @param  string   String              Element that will be modified.
 * @param  Array    candidateArray      Array the element possible is.
 * @param  int      candidateIndex      Index of the candidate.
 * @param  string   backgroundPosition1 New background position of the mutated element if voting status is true.
 * @param  string   backgroundPosition2 New background position of the mutated element if voting status is false.
 * @param  boolean  reverseVotingStatus If *true*, the voting status will be reversed.
 */
String.prototype.changeBackgroundPosition =
    function(candidateArray, candidateIndex, backgroundPosition1, backgroundPosition2, reverseVotingStatus)
    {
        var elemToBeModified = document.querySelector(this.toString());
        var reverseStatus = reverseVotingStatus && (reverseVotingStatus != 'undefined'); // Gets boolean if reverseVotingStatus is true or false.

        if (!candidateArray[2][candidateIndex]) {
            $(elemToBeModified).css('background-position', backgroundPosition1);
        } else {
            $(elemToBeModified).css('background-position', backgroundPosition2);
        }

        if (!candidateArray[2][candidateIndex] && reverseStatus) { // Image has not been clicked yet, or unclicked
            candidateArray[2][candidateIndex] = true; // Set candidate voting status to voted
        } else if (candidateArray[2][candidateIndex] && reverseStatus) { // Image has been clicked
            candidateArray[2][candidateIndex] = false; // Set candidate voting status to not voted
        }
    }
;

/// Miscellaneous functions/prototypes

/**
 * Capitalizes the first letter of a string
 * @type string
 */
String.prototype.capitalizeFirstLetter =
    function()
    {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
;