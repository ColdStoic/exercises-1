(function scopeWrapper($) {
    // Register click handler for #request button
    $(function onDocReady() {
        $('#formItem').submit(putInventoryItem);
        $('#signOut').click(function() {
            alert("You have been signed out.");
            window.location = "signin.html";
        });

        getInventory();
    });

    function getInventory() {
        $.ajax({
            url: _config.api.invokeUrl + '/inventory',
            type: 'GET',
            // headers: {
            //     Authorization: authToken
            // },
            success: updateInventory
        });
    }

    function updateInventory(data) {
        $('#tableBody').children().remove();

        for(var i = 0; i < data.Items.length; i++) {
            $('#tableBody').append($(
                '<tr>' + 
                '<td>' + data.Items[i].item_id + '</td>' +
                '<td>' + data.Items[i].item_name + '</td>' +
                '<td>' + data.Items[i].supplier_name + '</td>' +
                '<td>' + data.Items[i].quantity + '</td>' +
                '<td><button type="button" class="btn btn-primary btn-sm invRemove">Remove</button></td>' +
                '</tr>'
            ));
        }

        $('.invRemove').click(function() {
            var item = [];
            $(this).parent().parent().find("td").each(function(){
                item.push($(this).html());
            });
            
            removeInventoryItem(item);
            getInventory();
        });
    }

    function putInventoryItem() {
        event.preventDefault();
        var itemName = $("#inputItem").val();
        var supplierName = $("#inputSupplier").val();
        var quantity = parseInt($("#inputQuantity").val());
        
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/inventory',
            data: JSON.stringify({
                item: {
                    itemName:itemName,
                    supplierName:supplierName,
                    quantity:quantity
                }
            }),
            contentType: 'application/json',
            success: getInventory,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
            }
        });
    }

    function removeInventoryItem(item) {
        $.ajax({
            method: 'DELETE',
            url: _config.api.invokeUrl + '/inventory',
            data: JSON.stringify({
                item: {
                    itemId: item[0]
                }
            }),
            contentType: 'application/json',
            success: getInventory,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured:\n' + jqXHR.responseText);
            }
        });
    }
}(jQuery));