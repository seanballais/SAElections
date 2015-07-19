function Candidate(a, b) {
    this.firstName = a, this.candidateIndex = b, this.voteState = 0;
}

function getCookie(a) {
    "use strict";
    var b = null;
    if (document.cookie && "" !== document.cookie) for (var c = document.cookie.split(";"), d = 0; d < c.length; d++) {
        var e = c[d].trim();
        if (e.substring(0, a.length + 1) == a + "=") {
            b = decodeURIComponent(e.substring(a.length + 1));
            break;
        }
    }
    return b;
}

function auth_check(a, b, c, d) {
    "use strict";
    var e = {
        studentID: a,
        password: b,
        csrfmiddlewaretoken: getCookie("csrftoken")
    };
    $.post("/authenticate/", e, function(a) {
        $(incorrect_msg).css("visibility", "hidden"), "" !== b && ("success" == a ? ($(c).css("visibility", "hidden"), 
        d.disabled = !1) : ($(c).css("visibility", "visible"), d.disabled = !0));
    });
}

Candidate.prototype.getFirstName = function(a) {
    return "lower" === a || 0 === a ? this.firstName.charAt(0).toLowerCase() + this.firstName.slice(1) : "upper" === a || 1 === a ? this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1) : this.firstName;
}, Candidate.prototype.getCandidateIndex = function() {
    return this.candidateIndex;
}, Candidate.prototype.getVoteState = function() {
    return this.voteState;
}, Candidate.prototype.setVoteState = function(a) {
    "voted" === a || a === !0 || 1 == a ? this.voteState = 1 : this.voteState = 0;
};

var candidateJohan = new Candidate("Johan", 0), candidateKobe = new Candidate("Kobe", 1), candidateJeri = new Candidate("Jeri", 2), candidateSophia = new Candidate("Sophia", 3), candidateLinette = new Candidate("Linette", 4), candidateRonel = new Candidate("Ronel", 5), candidateRysa = new Candidate("Rysa", 6), candidateNicolas = new Candidate("Nicolas", 7), candidateFranz = new Candidate("Franz", 8), candidateJoshua = new Candidate("Joshua", 9), candidateKhristeena = new Candidate("Khristeena", 10), candidateJazzel = new Candidate("Jazzel", 11);

$(document).ready(function() {
    var a = $("article").attr("id");
    if ("login-page" == a) {
        var b = document.querySelector("#student-id"), c = document.querySelector("#password"), d = document.querySelector("#login-btn"), e = document.querySelector("#login-incorrect");
        document.querySelector("#login-form").reset(), d.disabled = !0, $(c).on("input", function() {
            auth_check(b.value, c.value, e, d);
        });
    } else if ("voting-page" == a) {
        var f = "div#candidates > div", g = "div#candidates > div > div:first-child ~ div > img";
        $(f).each(function(a) {
            $(this).delay(1e3 * ++a + 500).fadeIn(1e3), $(this).hover(function() {
                $(this).fadeTo("slow", 1);
            }, function() {
                $(this).fadeTo("slow", .6);
            });
        }), $("div#app-buttons").delay(7500).fadeIn(1e3), $(g).each(function() {
            var a = window["candidate" + ($(this).attr("id").charAt(0).toUpperCase() + $(this).attr("id").slice(1))];
            console.log("candidate" + ($(this).attr("id").charAt(0).toUpperCase() + $(this).attr("id").slice(1)));
            var b = -128 * a.getCandidateIndex();
            $(this).hover(function() {
                b += 0 === a.getVoteState() ? " -128" : " -256", $(this).css("background-position", b);
            }, function() {
                b += 0 === a.getVoteState() ? " 0" : " -128", $(this).css("background-position", b);
            });
        });
    }
});