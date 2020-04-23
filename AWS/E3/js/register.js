(function scopeWrapper($) {
    $(function onDocReady() {
        $('#formRegister').submit(handleRegister);
    });

    function handleRegister(event) {
        event.preventDefault();

        var firstname = $('#inputFirstname').val();
        var lastname = $('#inputLastname').val();
        var email = $('#inputEmail').val().toLowerCase();
        var password = $('#inputPassword').val();
        var password2 = $('#inputPassword2').val();
        
        if (password === password2) {
            register(firstname, lastname, email, password);
        } else {
            alert('Passwords do not match');
        }  
    }

    function register(firstname, lastname, email, password) {
        $.ajax({
            method: 'PUT',
            url: _config.api.invokeUrl + '/user',
            data: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            }),
            contentType: 'application/json',
            success: verifyRegistration,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
            }
        });
    }

    function verifyRegistration(result) {
        if (result) {
            alert("Registration succsessful");
            window.location.href = '/';
        } else {
            alert("Error registering");
        }
    }
}(jQuery));