function getCookie(name)
{
    'use strict';
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}

function auth_check(studentID, password, incorrect_msg, btnLogin)
{
    'use strict';
    var data = {
        'studentID': studentID,
        'password': password,
        'csrfmiddlewaretoken': getCookie('csrftoken')
    };
    $.post('/authenticate/', data,
        function(response)
        {
            $(incorrect_msg).css('visibility', 'hidden');
            if (password !== '') {
                if (response == 'success') {
                    $(incorrect_msg).css('visibility', 'hidden');
                    btnLogin.disabled = false;
                } else {
                    $(incorrect_msg).css('visibility', 'visible');
                    btnLogin.disabled = true;
                }
            }
        }
    );
}

$(document).ready(
    function()
    {
        'use strict';
        var studentID = document.querySelector('#student-id');
        var password = document.querySelector('#password');
        var btnLogin = document.querySelector('#login-btn');
        var incorrect_msg = document.querySelector('#login-incorrect');

        document.querySelector('#login-form').reset();
        btnLogin.disabled = true;

        $(password).on('input',
            function()
            {
                auth_check(
                    studentID.value,
                    password.value,
                    incorrect_msg,
                    btnLogin
                );
            }
        );
    }
);