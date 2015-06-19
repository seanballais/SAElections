'use strict';

/////////////////////////////////////////////
///                                       ///
///   Javascipt file for the vote page.   ///
///   DO NOT CHANGE ANYTHING UNLESS YOU   ///
///   KNOW WHAT YOU ARE DOING!!!          ///
///                                       ///
/////////////////////////////////////////////

if (typeof jQuery === 'undefined') { // Requires jQuery
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
        [ // Initial background position
            '0 0',           // Johan's background position
            '-130px 0',      // Kobe's background position
            '-260px 0',      // Jeri's background position
            '-390px 0',      // Sophia's background position
            '-520px 0',      // Linette's background position
            '-650px 0'       // Ronel's background position
        ],
        [ // Background position where a check mark is over the candidate's image
            '0 -128px',      // Johan's background position
            '-130px -128px', // Kobe's background position
            '-260px -128px', // Jeri's background position
            '-390px -128px', // Sophia's background position
            '-520px -128px', // Linette's background position
            '-650px -128px'  // Ronel's background position
        ],
        [ // Background position where a cross mark is over the candidate's image
            '0 -256px',      // Johan's background position
            '-130px -256px', // Kobe's background position
            '-260px -256px', // Jeri's background position
            '-390px -256px', // Sophia's background position
            '-520px -256px', // Linette's background position
            '-650px -256px'  // Ronel's background position
        ]            
    ]
];

var globalURL = window.location.protocol + '//' + window.location.host + '/'

if (page == 'auth-user-school') {
    var passcodeInputField = document.querySelector('#passcode');
    var btnContinue = document.querySelector('#continue-btn');
}

function checkPasscode()
{
    var data = {
        'passcode': passcodeInputField.value,
        csrfmiddlewaretoken: csrf_token
    };
            
    $.post('/check-passcode/', data,
        function(response)
        {
            var incorrect_pass_msg = document.querySelector('h6#incorrect-passcode-msg');

            if (response === 'success') {
                $(incorrect_pass_msg).css('visibility', 'hidden');
                btnContinue.disabled = false;
            } else {
                $(incorrect_pass_msg).css('visibility', 'visible');
                btnContinue.disabled = true;
            }
        }
    );
}

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

    if (page == 'auth-user-school') {
        passcodeInputField.value = '';
        btnContinue.disabled = true;
    }
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

            $(elemID).hover( // Handles hover on each candidate's image. Uses the first name.
                function() // Executes when mouse is over a candidate's image
                {
                    elemID.changeBackgroundPosition(
                        candidates,
                        index,
                        surname.getCandidateCheckBgPos(candidates),
                        surname.getCandidateCrossBgPos(candidates)
                    );
                },
                function() // Executes when mouse is out of a candidate's image
                {
                    elemID.changeBackgroundPosition(
                        candidates,
                        index,
                        surname.getCandidateInitBgPos(candidates),
                        surname.getCandidateCheckBgPos(candidates)
                    );
                }
            );
        }
    );
}

/**
 * Handles everything regarding click actions.
 */
function pageClicks()
{
    // Handle hovers on candidate div blocks
    $(candidates[0]).each(
        function(index) 
        {
            var surname = this.toString();
            var firstName = surname.getCandidateFirstName(candidates);
            var elemID = '#' + firstName;

                $(elemID).click(
                function()
                {
                    elemID.changeBackgroundPosition(
                        candidates,
                        index,
                        surname.getCandidateCheckBgPos(candidates),
                        surname.getCandidateInitBgPos(candidates),
                        true
                    );
                }
            );
        }
    );

    // Handles click on the 'Continue' button
    $('#continue-btn').click(
        function()
        {
            confirmUser(btnContinue, globalURL);
        }
    );

    // Handles click on the 'Finish Voting' button
    $('#finish-voting').click(
        function()
        {
            var rawURL = globalURL + 'save-votes/';
            var votedCandidates = "";

            for (var index = 0; index < 6; index++) { // Check each state and add it to a string if the candidate is voted
                var isCandidateVoted = candidates[2][index];

                if (isCandidateVoted == true) { // Checks if the candidate has been voted and adds it to the list of voted candidates
                    votedCandidates += candidates[0][index].toString() + ',';
                }
            }

            votedCandidates = votedCandidates.substring(0, votedCandidates.length - 1);

            window.location.replace(rawURL + votedCandidates + '/');
        }
    );
}

function pageKeyPresses()
{
    $('#passcode').keydown(
        function(event)
        {
            if (event.keyCode == 13) {
                confirmUser(btnContinue, globalURL);
            }
        }
    );
}

/**
 * The 'main' function.
 * @param function
 */
$(document).ready(
    function()
    {
        pageInit();
        pageHovers();
        pageClicks();
        pageKeyPresses();
    }
);