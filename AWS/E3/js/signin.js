(function scopeWrapper($) {
    $(function onDocReady() {
        $('#signinForm').submit(signin);
    });

    function signin() {
        event.preventDefault();
        console.log("Clicked");

        var email = $("#inputEmail").val();
        var password = $("#inputPassword").val();

        console.log(email, password);

        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/user',
            data: JSON.stringify({
                email: email,
                password: password
            }),
            contentType: 'application/json',
            success: verifySignin,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                
            }
        });
    }

    function verifySignin(result) {
        if (result) {
            sessionStorage.setItem("auth", "true");
            window.location.href = '/';
        } else {
            alert("Incorrect email or password");
        }
    }
}(jQuery));