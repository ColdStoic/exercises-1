(function scopeWrapper($) {
    // Functions run when page is loaded
    $(function onDocReady() {
        $('#formSearch').submit(search);
        $('#signOut').click(function() {
            alert("You have been signed out.");
            window.location = "signin.html";
        });
    });

    // API Post call to Youtube search api
    function search() {
        event.preventDefault();
        var inputSearch = $("#inputSearch").val();

        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/youtube',
            data: JSON.stringify({
                item: {
                    search: inputSearch
                }
            }),
            contentType: 'application/json',
            success: displayResult,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured:\n' + jqXHR.responseText);
            }
        });
    }

    // Displays videos in html
    function displayResult(result) {
        var videos = JSON.parse(result.body).videos;

        $("#videos-container").html("");
        $.each(videos, function(index, video) {
            $.get("video.html", function(data) {
                $("#videos-container").append(videoContainer(data, [{"videoid":video.id.videoId}]));
            });
        });
    }

    function videoContainer(e, t) {
        res = e;
        for(var n = 0; n < t.length; n++) {
            res = res.replace(/\{\{(.*?)\}\}/g, function(e, r) {
                return t[n][r];
            })
        }
        return res;
    }
}(jQuery));