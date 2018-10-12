$(document).ready(function () {
    var param = new URLSearchParams(window.location.search);
    var id;
    if (!param.has('id')){
        alert('Cannot retrieve values without id! Using default id of 1!');
        id = 1;
    }
    else {
        id = param.get('id');
    }
    getData(id);
});


function getData(id) {
    $.ajax({
        type: "GET",
        url: "https://ipcsmmd-webshop-group16.azurewebsites.net/api/beers/" + id,
        dataType: "json",
        success: function (beer) {
            buildBeer(beer);
        },
        error: function(request, message, error) {
            handleException(request, message, error);
        }
    });
}

function buildBeer(beer) {
    var s = 
    '<div id="beerbox1"><img src="' + beer.imageURL + '" alt=""></div> ' +
        '<div id="beerbox2">' +
            '<div id="beerbox2_txt">' +
                '<div class="beerDetail" id="name">Beer name: '+ beer.name + '</div>' +
                '<div class="beerDetail" id="brand">Brand: ' + beer.brand + '</div>' +
                '<div class="beerDetail" id="type">Type: ' + beer.type + '</div>' +
                '<div class="beerDetail" id="percentage">Percentage: ' + beer.percentage + '%</div>' +
                '<div class="beerDetail" id="price">Price: $' + beer. price + '</div>' +
                '<div class="beerDetail" id="stock">Stock: '+ beer.stock + 'pcs</div>' +
            '</div>' +
        '</div>'+
    '</div>'
    $('main').append(s);
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