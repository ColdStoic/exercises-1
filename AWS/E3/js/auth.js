(function scopeWrapper($) {
    $(function onDocReady() {
        var auth = sessionStorage.getItem("auth");
        if (auth != "true") {
            window.location.href = 'signin.html';
        }
    });
}(jQuery));