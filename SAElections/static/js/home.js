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
};

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
        function(index) {
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

    // Handle hovers on candidate div blocks
    $(candidates[0]).each(
        function(index) {
            $('#' + this.toString()).hover( // Handles hover on each candidate's div block
                function() { // Executes when mouse is over a candidate's div block
                    var firstName = this.toString().getCandidateFirstName(candidates);
                    var clickID = '#' + firstName + '-click';
                    var voteState = this.toString().getCandidateReverseVoteState(candidates);
                    var gender = this.toString().getCandidateGender(candidates);
                    firstName = firstName.capitalizeFirstLetter();

                    
                }
            );
        }
    ); 
    $('#castillejos').hover( // Handles hover on Johan's div block
        function() { // Executes when mouse is over Johan's div block
            var voteState = getVotingStatus(candidState, 0);
            changeTextOnHoverWithEffect(
                '#johan-click', 
                'Click Johan (of Arc) to '+ voteState +' him.',
                'fadeIn',
                'fast'
            );
            $('#johan-click').animate({ color: '#313131' }, 'fast');
        },
        function() { // Executes when mouse is out of Johan's div block
            changeTextOnHoverWithEffect(
                '#johan-click', 
                '...',
                'fadeOut',
                'fast'
            );
            $('#johan-click').animate({ color: '#fff' }, 'fast');
        }
    );

    $('#bismark').hover( // Handles hover on Kobe's div block
        function() { // Executes when mouse is over Kobe's div block
            var voteState = getVotingStatus(candidState, 1);
            changeTextOnHoverWithEffect(
                '#kobe-click',
                'Click Ormoc guy to ' + voteState + ' him.',
                'fadeIn',
                'fast'
            );
        },
        function() { // Executes when mouse is out of Kobe's div block
            changeTextOnHoverWithEffect(
                '#kobe-click',
                '...',
                'fadeOut',
                'fast'
            );
        }
    );

    $('#latorre').hover( // Handles hover on Jeri's div block
        function() { // Executes when mouse is over Jeri's div block
            var voteState = getVotingStatus(candidState, 2);
            changeTextOnHoverWithEffect(
                '#jeri-click',
                'Click Pretty Lady to ' + voteState + ' her.',
                'fadeIn',
                'fast'
            );
        },
        function() { // Executes when mouse is out of Jeri's div block
            changeTextOnHoverWithEffect(
                '#jeri-click',
                '...',
                'fadeOut',
                'fast'
            );
        }
    );

    $('#sevilla').hover( // Handles hover on Sophia's div block
        function() { // Executes when mouse is over Sophia's div block
            var voteState = getVotingStatus(candidState, 3);
            changeTextOnHoverWithEffect(
                '#sophia-click',
                'Click Smart Girl to ' + voteState + ' her.',
                'fadeIn',
                'fast'
            );
        },
        function() { // Executes when mouse is out of Sophia's div block
            changeTextOnHoverWithEffect(
                '#sophia-click',
                '...',
                'fadeOut',
                'fast'
            );
        }
    );

    $('#limsiaco').hover( // Handles hover on Linette's div block
        function() { // Executes when mouse is over Linette's div block
            var voteState = getVotingStatus(candidState, 4);
            changeTextOnHoverWithEffect(
                '#linette-click',
                'Click Girlaloo to ' + voteState + ' her.',
                'fadeIn',
                'fast'
            );
        },
        function() { // Executes when mouse is out of Linette's div block
            changeTextOnHoverWithEffect(
                '#linette-click',
                '...',
                'fadeOut',
                'fast'
            );
        }
    );

    $('#ecaldre').hover( // Handles hover on Ronel's div block
        function() { // Executes when mouse is over Ronel's div block
            var voteState = getVotingStatus(candidState, 5);
            changeTextOnHoverWithEffect(
                '#ronel-click',
                'Click Cool Guy to ' + voteState + ' him.',
                'fadeIn',
                'fast'
            );
        },
        function() { // Executes when mouse is out of Ronel's div block
            changeTextOnHoverWithEffect(
                '#ronel-click',
                '...',
                'fadeOut',
                'fast'
            );
        }
    );

    // TODO: Search in the net why .hover doesn't accept a function as a parameter and why
    // a function suddenly runs inside .hover without function() {} in the .hover
    // parameters.
    // Handle hover on candidate pictures
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