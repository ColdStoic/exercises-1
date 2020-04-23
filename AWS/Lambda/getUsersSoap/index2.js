(function scopeWrapper($) {
    var url = 'https://c65gho8nhl.execute-api.us-east-2.amazonaws.com/prod/soap'; // Preferably write this out from server side
    
    $(function onDocReady() {
        $('#button').click(callSoap);
    });

    function callSoap() {
        console.log("Calling SOAP");
        var email = 'peter.d.ngu@gmail.com';
        var soapMessage =
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
                <soap:Body> \
                    <getUserInfo xmlns="https://www.w3schools.com/userinfo"> \
                        <userEmail>' + email + '</userEmail> \
                    </getUserInfo> \
                </soap:Body> \
            </soap:Envelope>';
            
        $.ajax({
            url: url,
            method: 'POST',
            dataType: "text/xml",
            data: soapMessage,
            complete: printResults,
            // success: printResults,
            contentType: "text/xml; charset=\"utf-8\"",
            // contentType: "application/json",
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
            }
        });
    }
    
    // function endSaveProduct(xmlHttpRequest, status) {
    //     $(xmlHttpRequest.responseXML)
    //     .find('SaveProductResult')
    //     .each(function() {
    //         var name = $(this).find('Name').text();
    //     });
    // }

    function printResults(result) {
        //console.log(xmlHttpRequest.responseXML);
        console.log(result.responseJSON);
    }
}(jQuery));