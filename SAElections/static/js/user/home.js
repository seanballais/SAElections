function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
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

function checkStudentID()
{
    var studentIDInputField = document.querySelector('#student-id');
    var passwordInputField = document.querySelector('#password');
    var btnLogin = document.querySelector('#login-btn');
    
    var data = {
        'studentID': studentIDInputField.value,
        'password': passwordInputField.value,
        'csrfmiddlewaretoken': getCookie('csrftoken')
    };
            
    $.post('/authenticate/', data,
        function(response)
        {
            var login_incorrect_msg = document.querySelector('#login-incorrect');

            if (response === 'success') {
                $(login_incorrect_msg).css('visibility', 'hidden');
                btnLogin.disabled = false;
            } else {
                $(login_incorrect_msg).css('visibility', 'visible');
                btnLogin.disabled = true;
            }
        }
    );
}

$(document).ready(
    function()
    {
        var btnLogin = document.querySelector('#login-btn');

        document.querySelector('#student-id').value = '';
        document.querySelector('#password').value = '';
        btnLogin.disabled = true;

        $('#login-btn').click(
            function()
            {
                if (btnLogin.disabled == false) {
                    reloadPage();
                }
            }
        );

        $('#student-id, #password').keydown(
            function(event)
            {
                if (event.keyCode == 13 && btnLogin.disabled == false) {
                    reloadPage();
                }
            }
        );
    }
);