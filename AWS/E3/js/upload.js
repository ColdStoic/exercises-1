(function scopeWrapper($) {
    // Functions run when page is loaded
    $(function onDocReady() {
        $('#formUpload').submit(uploadItem);
        $('#signOut').click(function() {
            alert("You have been signed out.");
            window.location = "signin.html";
        });

        getUploads();
    });

    // API call to get files in S3 bucket uploads folder
    function getUploads() {
        $('#tableBody').children().remove();
        $('#tableBody').append($(
            '<tr>' + 
            '<td>' + 'Loading Files..' + '</td>' +
            '<td>' + '</td>' +
            '<td>' + '</td>' +
            '</tr>'
        ));

        setTimeout(function() {
            $.ajax({
            url: _config.api.expressApi + '/upload',
            type: 'GET',
            success: updateUploads
        });
        }, 5000);
    }

    // Updates HTML file list table
    function updateUploads(data) {
        $('#tableBody').children().remove();

        for(var i = 1; i < data.Contents.length; i++) {
            $('#tableBody').append($(
                '<tr>' + 
                '<td>' + data.Contents[i].Key.substring(8) + '</td>' +
                '<td>' + data.Contents[i].Size + '</td>' +
                '<td>' + data.Contents[i].LastModified + '</td>' +
                '</tr>'
            ));
        }
    }

    // API Post call to upload file
    function uploadItem() {
        event.preventDefault();
        var file = $("#inputFile").prop('files')[0];
        var formData = new FormData();
        formData.append('file', file);

        // var fileReader = new FileReader();
        // fileReader.onload = function () {
        //     var data = fileReader.result;  // data <-- in this var you have the file data in Base64 format
        //     console.log(data);
        // };
        // fileReader.readAsDataURL(file);
        
        $.ajax({
            method: 'POST',
            url: _config.api.expressApi + '/upload',
            enctype: 'multipart/form-data',
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            timeout: 600000,
            success: getUploads,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured:\n' + jqXHR.responseText);
            }
        });
    }
}(jQuery));