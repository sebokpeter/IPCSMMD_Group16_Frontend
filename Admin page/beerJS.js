$('#myForm').on('submit',function(e){
    e.preventDefault();

    var  imageUrl = $('#imageURL').val();
    var  beerName = $('#beerName').val();
    var  beerBrand = $('#beerBrand').val();
    var  beerPercentage = $('#beerPercentage').val();
    var  beerPrice = $('#beerPrice').val();
    var  beerStock = $('#beerStock').val();
    var  beerType = $('#beerType').val();

    console.log(imageUrl);
    console.log(beerName);
    console.log(beerBrand);
    console.log(beerPercentage);
    console.log(beerPrice);
    console.log(beerStock);
    console.log(beerType);

    $.ajax({
        url: "http://localhost:58584/api/Beers",
        type: 'POST',
        data: JSON.stringify({
            "name": beerName,
            "brand": beerBrand,
            "type": beerType,
            "percentage": beerPercentage,
            "price": beerPrice,
            "imageURL": imageUrl,
            "stock": beerStock}),
        processData: false,
        contentType: 'application/json',
        success: function (comments) {
            console.log("Yiiiaaaahhhhaaaaaa");
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
});

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