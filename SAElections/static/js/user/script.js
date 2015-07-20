function Candidate(a, b) {
    var c = a, d = b, e = 0;
    this.getFirstName = function(a) {
        return "lower" == a ? c.charAt(0).toLowerCase() + c.slice(1) : "upper" == a ? c.charAt(0).toUpperCase() + c.slice(1) : c;
    }, this.getCandidateIndex = function() {
        return d;
    }, this.getVoteState = function() {
        return e;
    }, this.setVoteState = function(a) {
        e = "voted" === a || a === !0 || 1 == a ? 1 : 0;
    };
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

$(document).ready(function() {
    var a = {};
    a.johan = new Candidate(0), a.kobe = new Candidate(1), a.jeri = new Candidate(2), 
    a.sophia = new Candidate(3), a.linette = new Candidate(4), a.ronel = new Candidate(5), 
    a.rysa = new Candidate(6), a.nicolas = new Candidate(7), a.franz = new Candidate(8), 
    a.joshua = new Candidate(9), a.khristeena = new Candidate(10), a.jazzel = new Candidate(11);
    var b = $("article").attr("id");
    if ("login-page" == b) {
        var c = document.querySelector("#student-id"), d = document.querySelector("#password"), e = document.querySelector("#login-btn"), f = document.querySelector("#login-incorrect");
        document.querySelector("#login-form").reset(), e.disabled = !0, $(d).on("input", function() {
            auth_check(c.value, d.value, f, e);
        });
    } else if ("voting-page" == b) {
        var g = "div#candidates > div", h = "div#candidates > div > div:first-child ~ div > img";
        $(g).each(function(a) {
            $(this).delay(1e3 * ++a + 500).fadeIn(1e3), $(this).hover(function() {
                $(this).fadeTo("slow", 1);
            }, function() {
                $(this).fadeTo("slow", .6);
            });
        }), $("div#app-buttons").delay(7500).fadeIn(1e3), $(h).each(function() {
            var b = a[$(this).attr("id")], c = (-128 * b.getCandidateIndex()).toString(), d = "";
            $(this).hover(function() {
                d = c, d += 0 === b.getVoteState() ? "px -128px" : "px -256px", console.log(b.getVoteState()), 
                $(this).css("background-position", d);
            }, function() {
                d = c, d += 0 === b.getVoteState() ? "px 0px" : "px -128px", console.log(b.getVoteState()), 
                $(this).css("background-position", d);
            }), $(this).click(function(a) {
                a.preventDefault(), d = c, 0 === b.getVoteState() ? (b.setVoteState("voted"), d += "px -128px") : (b.setVoteState("unvoted"), 
                d += "px 0px"), console.log(b.getVoteState()), $(this).css("background-position", d);
            });
        });
    }
});