$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "https://ipcsmmd-webshop-group16.azurewebsites.net/api/beers?CurrentPage=1&ItemsPerPage=6&isAscending=true&SearchField=id",
        dataType: "json",
        success: function (beers) {
            listBeers(beers);
        },
        error: function(request, message, error){
            handleException(request, message, error);
        }
    });

    $('#searchBar').on('keydown', function (e) {
        if(e.which == 13 || e.keycode == 13) {
            var searchedString = $(this).val();
            search(searchedString)
        }
    })

    function search(searchedString){
        var beersReturnded;
        if(searchedString || !searchedString==="") {
           beersReturnded = getSearchedBeers(searchedString);
        }
        else {
            $.ajax({
                type: "GET",
                url: "https://ipcsmmd-webshop-group16.azurewebsites.net/api/beers?CurrentPage=1&ItemsPerPage=6&isAscending=true&SearchField=id",
                dataType: "json",
                success: function (response) {
                    beersReturnded = response;
                },
                error: function(request, message, error) {
                    handleException(request, message, error);
                }
            });
        }
        if(beersReturnded===undefined || beersReturnded.length <1) {
            alert('Could not find anything');
            return;
        }
        $('#main-right').empty();
        listBeers(beersReturnded);
    }
});

function getSearchedBeers(searchedString){
    $.ajax({
        type: "GET",
        url: "https://ipcsmmd-webshop-group16.azurewebsites.net/api/beers?CurrentPage=1&ItemsPerPage=6&isAscending=true&SearchField=id&SearchString=" + searchedString,
        dataType: "json",
        success: function (response) {
            return response;              
        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
}


    
function openDetailPage(id) {
    window.location= '../Detail%20page/index.html?id=' + id;                                                                                                                          
}


function listBeers(beers) {
    $.each(beers, function (index, beer) { 
        console.log('Beer name:' + beer.name);
        console.log('Beer brand: ' + beer.brand);
        console.log('Beer type: ' + beer.type);
        console.log('Beer price: ' + beer.price);
        console.log('Beer percentage: ' + beer.percentage);
        buildDescriptionPage(beer);
    });
}

function buildDescriptionPage(beer){
    var s = ' <div id="product"> ' + 
    '<div id="producttitle">' + beer.brand + " " + beer.name + '</div>' +
    '<div id="productimage"> <img src="' + beer.imageURL + '" alt="css/carlsbergcan.png"></div>' +
    '<div id="price">Price: $' + beer.price + '</div>' + 
    '<div id="cart"> <a class="btnDetail" onclick="openDetailPage('+ beer.id +')"> Buy</a> </div>' + 
    '</div>';
    console.log(s);
    $('#main-right').append(s);
}

function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" +
            request.responseJSON.Message + "\n";
    }
    alert(msg);
}
