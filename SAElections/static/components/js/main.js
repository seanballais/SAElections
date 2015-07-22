if (typeof jQuery === 'undefined') { // Requires jQuery
    throw new Error('This web app requires jQuery.');
}

$(document).ready(
    function()
    {
        var candidate = {};
        // CHICSER
        candidate.johan      = new Candidate('Johan', 0);
        candidate.kobe       = new Candidate('Kobe',  1);
        candidate.jeri       = new Candidate('Jeri', 2);
        candidate.sophia     = new Candidate('Sophia', 3);
        candidate.linette    = new Candidate('Linette', 4);
        candidate.ronel      = new Candidate('Ronel', 5);
        // Pisay LIFE
        candidate.rysa       = new Candidate('Rysa', 6);
        candidate.nicolas    = new Candidate('Nicolas', 7);
        candidate.franz      = new Candidate('Franz', 8);
        candidate.joshua     = new Candidate('Joshua', 9);
        candidate.khristeena = new Candidate('Khristeena', 10);
        candidate.jazzel     = new Candidate('Jazzel', 11);

        var articleID = $('article').attr('id');
        if (articleID == 'login-page') {
            var studentID = document.querySelector('#student-id');
            var password = document.querySelector('#password');
            var btnLogin = document.querySelector('#login-btn');
            var incorrectMsg = document.querySelector('#login-incorrect');
            var loginForm = document.querySelector('#login-form');

            loginForm.reset();
            btnLogin.disabled = true;

            $(password).on('input',
                function()
                {
                    auth_check(studentID.value, password.value, incorrectMsg, btnLogin);
                }
            );
        } else if (articleID == 'voting-page') {
            var candidates   = 'div#candidates > div';
            var candidateImg = 'div#candidates > div > div:first-child ~ div > img';

            $(candidates).each( // Iterates through each candidate position (e.g. #president)
                function(index)
                {
                    $(this).delay((++index * 1000) + 500).fadeIn(1000);

                    $(this).hover(
                        function() // Mouse is over the element
                        { 
                            $(this).fadeTo('slow', 1.0);
                        },
                        function() // Mouse is out of the element
                        {
                            $(this).fadeTo('slow', 0.6);
                        }
                    );
                }
            );
            $('div#app-buttons').delay(7500).fadeIn(1000);

            $(candidateImg).each( // Iterates through each candidate image
                function()
                {
                    var candid  = candidate[$(this).attr('id')];
                    var t_bgPos = (candid.getCandidateIndex() * -128).toString();
                    var bgPos   = '';
                    // We won't iterate through 'img' since we know
                    // that there is only one of the image with the
                    // id.
                    $(this).hover(
                        function() // Mouse is over the element
                        {
                            bgPos = t_bgPos;
                            if (candid.getVoteState() === 0) { // Candidate not voted
                                bgPos += 'px -128px';
                            } else { // Candidate voted
                                bgPos += 'px -256px';
                            }
                            $(this).css('background-position', bgPos);
                        },
                        function() // Mouse is out of the element
                        {
                            bgPos = t_bgPos;
                            if (candid.getVoteState() === 0) { // Candidate not voted
                                bgPos += 'px 0px';
                            } else { // Candidate voted
                                bgPos += 'px -128px';
                            }
                            $(this).css('background-position', bgPos);
                        }
                    );

                    $(this).click(
                        function(e)
                        {
                            e.preventDefault();

                            bgPos = t_bgPos;
                            if (candid.getVoteState() === 0) { // Candidate not voted
                                candid.setVoteState('voted');
                                bgPos += 'px -128px';

                                // Check if opposite candidate has been voted
                                // if so, flip vote state
                                var oppositeCandidateIndex = 0;
                                if (candid.getCandidateIndex() <= 5) { // Candidate is from CHICSER
                                    oppositeCandidateIndex = candid.getCandidateIndex() + 6;
                                } else if (candid.getCandidateIndex() >= 6) { // Candidate is from Pisay LIFE
                                    oppositeCandidateIndex = candid.getCandidateIndex() - 6;
                                }

                                // Loop through each object in the associative array to find the opposite
                                // candidate. Once found and he/she has already been voted, his/her voting
                                // state will be flipped and the background position be set to the default.
                                $.each(candidate,
                                    function(i, candidateObj)
                                    {
                                        if (candidateObj.getCandidateIndex() == oppositeCandidateIndex &&
                                            candidateObj.getVoteState() == 1) {
                                            // Got the opposite candidate and is voted
                                            candidateObj.setVoteState('unvoted');

                                            var candidImg = 'img#' + candidateObj.getFirstName('lower');
                                            var d_bgPos   = (oppositeCandidateIndex * -128).toString() + 'px 0px';
                                            $(candidImg).css('background-position', d_bgPos);          
                                        }
                                    }
                                );
                            } else { // Candidate is voted
                                candid.setVoteState('unvoted');
                                bgPos += 'px 0px';
                            }
                            $(this).css('background-position', bgPos);
                        }
                    );
                }
            );
            
            var rawURL = window.location.protocol + '//' + window.location.host + '/';
            $('button#vote-button').click(
                function()
                {
                    // Position 0 is for the President, and Position 5 is for the P.I.O.
                    var candidatePositions = ['', '', '', '', '', ''];
                    // Iterate through each candidate to see which ones have been voted
                    $.each(candidate,
                        function(i, candidateObj)
                        {
                            if (candidateObj.getVoteState() == 1) { // Candidate has been voted
                                var positionIndex = 0;
                                if (candidateObj.getCandidateIndex() > 5) {
                                    positionIndex = candidateObj.getCandidateIndex() - 6;
                                } else {
                                    positionIndex = candidateObj.getCandidateIndex();
                                }
                                candidatePositions[positionIndex] = candidateObj.getFirstName('lower');
                            }
                        }
                    );

                    // Set empty slots in candidatePositions to 'none'
                    for (var i = 0; i < 6; i++) {
                        if (candidatePositions[i] === '') {
                            candidatePositions[i] = 'none';
                        }
                    }

                    // Save votes
                    var saveURL = rawURL + 'save-votes/';
                    var votedCandidates = '';
                    for (var index = 0; index < 6; index++) {
                        votedCandidates += candidatePositions[index] + ',';
                    }

                    // Remove the last comma from 'votedCandidates'
                    votedCandidates = votedCandidates.substring(0, votedCandidates.length - 1);
                    window.location.replace(saveURL + votedCandidates + '/');
                }
            );

            $('button#logout-button').click(
                function() 
                {
                    window.location.replace(rawURL + 'logout/');
                }
            );
        }
    }
);