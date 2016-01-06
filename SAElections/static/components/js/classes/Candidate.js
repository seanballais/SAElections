function Candidate(name, index) {
    var firstName = name;
    var candidateIndex = index;
    // voteState is 0 for 'unvoted', and 1 for 'voted'.
    var voteState = 0;

    this.getFirstName = function(firstLetterCase) {
        if (firstLetterCase == 'lower') {
            return firstName.charAt(0).toLowerCase() + firstName.slice(1);
        } else if (firstLetterCase == 'upper') {
            return firstName.charAt(0).toUpperCase() + firstName.slice(1);
        }
        return firstName;
    };
    this.getCandidateIndex = function() { return candidateIndex; };
    this.getVoteState = function() { return voteState; };
    this.setVoteState = function(state) {
        // 'state' can be either be 'unvoted' or 0, 
        // or 'voted' or 1. Default is 'unvoted' or 0.
        if (state === 'voted' || state === true || state == 1) {
            voteState = 1;
        } else {
            voteState = 0;
        }
    };
}