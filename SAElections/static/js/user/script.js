function Candidate(a,b){this.firstName=a,this.candidateIndex=b,this.voteState=0}function getCookie(a){"use strict";var b=null;if(document.cookie&&""!==document.cookie)for(var c=document.cookie.split(";"),d=0;d<c.length;d++){var e=c[d].trim();if(e.substring(0,a.length+1)==a+"="){b=decodeURIComponent(e.substring(a.length+1));break}}return b}function auth_check(a,b,c,d){"use strict";var e={studentID:a,password:b,csrfmiddlewaretoken:getCookie("csrftoken")};$.post("/authenticate/",e,function(a){$(incorrect_msg).css("visibility","hidden"),""!==b&&("success"==a?($(c).css("visibility","hidden"),d.disabled=!1):($(c).css("visibility","visible"),d.disabled=!0))})}Candidate.prototype.getFirstName=function(a){return"lower"===a||0===a?this.firstName.charAt(0).toLowerCase()+this.firstName.slice(1):"upper"===a||1===a?this.firstName.charAt(0).toUpperCase()+this.firstName.slice(1):this.firstName},Candidate.prototype.getCandidateIndex=function(){return this.candidateIndex},Candidate.prototype.getVoteState=function(){return this.voteState},Candidate.prototype.setVoteState=function(a){"voted"===a||a===!0||1==a?this.voteState=1:this.voteState=0},console.log("Hello");var articleID=$("article").attr("id");if("login-page"==articleID){var studentID=document.querySelector("#student-id"),password=document.querySelector("#password"),btnLogin=document.querySelector("#login-btn"),incorrectMsg=document.querySelector("#login-incorrect");document.querySelector("#login-form").reset(),btnLogin.disabled=!0,$(password).on("input",function(){auth_check(studentID.value,password.value,incorrectMsg,btnLogin)})}else"voting-page"==articleID&&$("div#candidates > div").each(function(a){$(this).delay(1e3*++a+500).fadeIn(1e3)});