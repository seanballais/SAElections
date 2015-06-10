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
 * Contains the list of candidate by family name,
 * their genders (0 for female (ladies first!), 1 for male),
 * and nicknames.
 * @type Array
 */
var candidates = [
    ['castillejos', 'bismark', 'latorre', 'sevilla', 'limsiaco', 'ecaldre'], // Candidate surname
    ['johan', 'kobe', 'jeri', 'sophia', 'linette', 'ronel'], // Candidate first name
    [false, false, false, false, false, false], // Candidate state (voted or not)
    [1, 1, 0, 0, 0, 1] // Candidate gender
];

/**
 * Initializes variables or effects that have to run
 * when the page is ready.
 */
function pageInit()
{
    /* 
     * Fade in the candidates with Johan fading in first
     * then Kobe and so one then the voting buttons.
     */
    var elements = candidates[0].slice();
    elements.push('voting-button');

    $(elements).each(
        function(index)
        {
            $('#' + this.toString()).delay(((index++) * 1000) + 500).fadeIn(1000);
        }
    );
}

/**
 * Handles everything regarding hover actions.
 */
function pageHovers() 
{
    $('.candid').hover( // Generic candidate hover handler
        function() // When mouse is over the element
        {
            $(this).animate({
                backgroundColor: '#fff',
                color: '#313131'
            }, 'fast');
        },
        function() // When mouse is out of the element
        {
            $(this).animate({
                backgroundColor: 'transparent',
                color: '#fff'
            }, 'fast');
        }
    );

    // Handle hovers on candidate div blocks
    $(candidates[0]).each(
        function() 
        {
            var surname = this.toString();
            var firstName = surname.getCandidateFirstName(candidates);
            var clickID = '#' + firstName + '-click';

            $('#' + this.toString()).hover( // Handles hover on each candidate's div block
                function() // Executes when mouse is over a candidate's div block
                {
                    var voteState = surname.getCandidateReverseVoteState(candidates);
                    var gender = surname.getCandidateGender(candidates);

                    firstName = firstName.capitalizeFirstLetter();
                    var text = 'Click ' + firstName + ' to ' + voteState + ' ' + gender + '.';

                    clickID.changeTextOnHover(text, '#313131', 'fadeIn', 'fast');
                },
                function() // Executes when mouse is out of a candidate's div block
                {
                    clickID.changeTextOnHover('...', '#fff', 'fadeOut', 'fast');
                }
            );
        }
    );

    // TODO: Search in the net why .hover doesn't accept a function as a parameter and why
    // a function suddenly runs inside .hover without function() {} in the .hover
    // parameters.
    // Handle hover on candidate pictures
    /*$('#johan').hover( // Handles hover on Johan's image
        function() {
            changeBackgroundPositionOnHover('#johan', 'mouseover', candidState, 0, '0 -128px', '0 -256px');
        },
        function() {
            changeBackgroundPositionOnHover('#johan', 'mouseout', candidState, 0, '0 0', '0 -128px');
        }
    );*/
}

/**
 * Handles everything regarding click actions.
 */
function pageClicks()
{
    $('#johan').click(function() { // Executes when Johan's picture has been clicked
        if (!candidState[0]) { // Image has not been clicked, or has been unclicked
            candidState[0] = true;
            $(this).css('background-position', '0 -128px');
        } else { // Image has been clicked already
            candidState[0] = false;
            $(this).css('background-position', '0 0');
        }
    });
}

/**
 * The 'main' function.
 * @param function
 */
$(document).ready(
    function() {
        pageInit();
        pageHovers();
        pageClicks();
    }
);