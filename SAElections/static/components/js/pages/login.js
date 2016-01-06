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

function auth_check(studentID, password, incorrectMsg, btnLogin)
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
            $(incorrectMsg).css('visibility', 'hidden');
            if (password !== '') {
                if (response == 'success') {
                    $(incorrectMsg).css('visibility', 'hidden');
                    btnLogin.disabled = false;
                } else {
                    $(incorrectMsg).css('visibility', 'visible');
                    btnLogin.disabled = true;
                }
            }
        }
    );
}