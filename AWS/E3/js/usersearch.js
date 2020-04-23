(function scopeWrapper($) {
    // Functions run when page is loaded
    $(function onDocReady() {
        $('#formSearch').submit(searchUser);
        $('#signOut').click(function() {
            alert("You have been signed out.");
            window.location = "signin.html";
        });
    });

    // Updates HTML file list table
    function updateUserInfo(data) {
        console.log(data);
        var xml = data.responseText;

        if (xml.search("errorType")!= -1) {
            alert("User email does not exist in database");
            return;
        }

        console.log(xml);
        var email = xml.match(/<email>(.*?)<\/email>/)[1];
        var userid = xml.match(/<user_id>(.*?)<\/user_id>/)[1];
        var firstname = xml.match(/<firstname>(.*?)<\/firstname>/)[1];
        var lastname = xml.match(/<lastname>(.*?)<\/lastname>/)[1];

        $('#tableBody').children().remove();
        $('#soap-message').text(formatXml(xml));
        // $('#soap-message').html(formatXml(data).$('#email')[0]);
        // var email = $(xml).find('email')[0].textContent;
        // var userid = $(xml).find('user_id')[0].textContent;
        // var firstname = $(xml).find('firstname')[0].textContent;
        // var lastname = $(xml).find('lastname')[0].textContent;

        $('#tableBody').append($(
            '<tr>' + 
            '<th>User ID</th>' +
            '<td>' + userid + '</td>' +
            '</tr>'
        ));
        $('#tableBody').append($(
            '<tr>' + 
            '<th>Firstname</th>' +
            '<td>' + firstname + '</td>' +
            '</tr>'
        ));
        $('#tableBody').append($(
            '<tr>' + 
            '<th>Lastname</th>' +
            '<td>' + lastname + '</td>' +
            '</tr>'
        ));
        $('#tableBody').append($(
            '<tr>' + 
            '<th>Email</th>' +
            '<td>' + email + '</td>' +
            '</tr>'
        ));
    }

    // API Post call to upload file
    function searchUser() {
        event.preventDefault();
        var email = $("#inputSearch").val();

        var soapMessage =
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://www.w3.org/2003/05/soap-envelope"> \
                <soap:Body> \
                    <getUserInfo xmlns="https://www.w3schools.com/userinfo"> \
                        <email>' + email + '</email> \
                    </getUserInfo> \
                </soap:Body> \
            </soap:Envelope>';
        // var data = "<soap:Envelope><soap:Body xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\"><getUserInfo xmlns=\"https://www.w3schools.com/userinfo\"><email>peter.d.ngu@gmail.com</email><user_id>asdasd</user_id><firstname>Peter</firstname><lastname>Nguyen</lastname></getUserInfo></soap:Body></soap:Envelope>";
        // updateUserInfo();
        
        $.ajax({
            url: _config.api.invokeUrl + '/soap',
            method: 'POST',
            dataType: "text",
            data: soapMessage,
            complete: updateUserInfo,
            contentType: "application/xml",
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert("User email does not exist in database");
            }
        });
    }

    var formatXml = this.formatXml = function (xml) {
        var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
        var wsexp = / *(.*) +\n/g;
        var contexp = /(<.+>)(.+\n)/g;
        xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
        var pad = 0;
        var formatted = '';
        var lines = xml.split('\n');
        var indent = 0;
        var lastType = 'other';
        // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
        var transitions = {
            'single->single': 0,
            'single->closing': -1,
            'single->opening': 0,
            'single->other': 0,
            'closing->single': 0,
            'closing->closing': -1,
            'closing->opening': 0,
            'closing->other': 0,
            'opening->single': 1,
            'opening->closing': 0,
            'opening->opening': 1,
            'opening->other': 1,
            'other->single': 0,
            'other->closing': -1,
            'other->opening': 0,
            'other->other': 0
        };

        for (var i = 0; i < lines.length; i++) {
            var ln = lines[i];

            // Luca Viggiani 2017-07-03: handle optional <?xml ... ?> declaration
            if (ln.match(/\s*<\?xml/)) {
                formatted += ln + "\n";
                continue;
            }
            // ---

            var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
            var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
            var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
            var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
            var fromTo = lastType + '->' + type;
            lastType = type;
            var padding = '';

            indent += transitions[fromTo];
            for (var j = 0; j < indent; j++) {
                padding += '\t';
            }
            if (fromTo == 'opening->closing')
                formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
            else
                formatted += padding + ln + '\n';
        }

        return formatted;
    };
}(jQuery));