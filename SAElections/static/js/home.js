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
    [1, 1, 0, 0, 0, 1], // Candidate gender
    [ // Background positions
        [ // Background position 1
            '0 -128px',      // Johan's background position
            '-130px -128px', // Kobe's background position
            '-260px -128px', // Jeri's background position
            '-390px -128px', // Sophia's background position
            '-520px -128px', // Linette's background position
            '-650px -128px'  // Ronel's background position
        ],
        [ // Background position 2
            '0 -256px',      // Johan's background position
            '-130px -256px', // Kobe's background position
            '-260px -256px', // Jeri's background position
            '-390px -256px', // Sophia's background position
            '-520px -256px', // Linette's background position
            '-650px -256px'  // Ronel's background position
        ],
        [ // Background position 3
            '0 0',           // Johan's background position
            '-130px 0',      // Kobe's background position
            '-260px 0',      // Jeri's background position
            '-390px 0',      // Sophia's background position
            '-520px 0',      // Linette's background position
            '-650px 0'       // Ronel's background position
        ]            
    ]
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
        function(index) 
        {
            var surname = this.toString();
            var firstName = surname.getCandidateFirstName(candidates);
            var elemID = '#' + firstName;
            var clickID = elemID + '-click';

            $('#' + this.toString()).hover( // Handles hover on each candidate's div block. Uses the surname.
                function() // Executes when mouse is over a candidate's div block
                {
                    var voteState = surname.getCandidateReverseVoteState(candidates);
                    var gender = surname.getCandidateGender(candidates);

                    var newFirstName = firstName.capitalizeFirstLetter();
                    var text = 'Click ' + newFirstName + ' to ' + voteState + ' ' + gender + '.';

                    clickID.changeTextOnHover(text, '#313131', 'fadeIn', 'fast');
                },
                function() // Executes when mouse is out of a candidate's div block
                {
                    clickID.changeTextOnHover('...', '#fff', 'fadeOut', 'fast');
                }
            );

            $(elemID).hover( // Handles hover on each candidate's image. Uses the first name.
                function() // Executes when mouse is over a candidate's image
                {
                    elemID.changeBackgroundPosition(candidates, index, '0 -128px', '0 -256px');
                },
                function() // Executes when mouse is out of a candidate's image
                {
                    elemID.changeBackgroundPosition(candidates, index, '0 0', '0 -128px');
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