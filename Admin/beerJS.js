var AllBeerList;

$('#myFormAdd').on('submit',function(e){
    e.preventDefault();

    var  imageUrl = $('#myFormAdd').find('.imgURL').val();
    var  beerName = $('#myFormAdd').find('.beerName').val();
    var  beerBrand = $('#myFormAdd').find('.beerBrand').val();
    var  beerPercentage = $('#myFormAdd').find('.beerPercentage').val();
    var  beerPrice = $('#myFormAdd').find('.beerPrice').val();
    var  beerStock = $('#myFormAdd').find('.beerStock').val();
    var  beerType = $('#myFormAdd').find('.beerType').val();

    console.log(imageUrl);
    console.log(beerName);
    console.log(beerBrand);
    console.log(beerPercentage);
    console.log(beerPrice);
    console.log(beerStock);
    console.log(beerType);

    $.ajax({
        url: "http://localhost:64016/api/Beers",
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
        success: function (post) {
            AllBeerList.push(post);
            clearTableList();
            postListSuccess(AllBeerList);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
});

$('#myFormUpdate').on('submit',function(e){
    e.preventDefault();

    var  id = $('#myFormUpdate').find('.id').val();
    var  imageUrl = $('#myFormUpdate').find('.imgURL').val();
    var  beerName = $('#myFormUpdate').find('.beerName').val();
    var  beerBrand = $('#myFormUpdate').find('.beerBrand').val();
    var  beerPercentage = $('#myFormUpdate').find('.beerPercentage').val();
    var  beerPrice = $('#myFormUpdate').find('.beerPrice').val();
    var  beerStock = $('#myFormUpdate').find('.beerStock').val();
    var  beerType = $('#myFormUpdate').find('.beerType').val();

    console.log(id);
    console.log(imageUrl);
    console.log(beerName);
    console.log(beerBrand);
    console.log(beerPercentage);
    console.log(beerPrice);
    console.log(beerStock);
    console.log(beerType);

    $.ajax({
        url: "http://localhost:64016/api/Beers/" + id,
        type: 'PUT',
        data: JSON.stringify({
            "id": id,
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

$('#myFormDelete').on('submit',function(e){
    e.preventDefault();

    var  id = $('#myFormDelete').find('.id').val();
    console.log(id);

    $.ajax({
        url: "http://localhost:64016/api/Beers/" + id,
        type: 'DELETE',
       /* data: JSON.stringify({
            "id": id,
            "name": beerName,
            "brand": beerBrand,
            "type": beerType,
            "percentage": beerPercentage,
            "price": beerPrice,
            "imageURL": imageUrl,
            "stock": beerStock}),*/
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

function postList() {
    // Call Web API to get a list of post
    $.ajax({
      url: 'http://localhost:64016/api/Beers/',
      type: 'GET',
      dataType: 'json',
      success: function (posts) {
        AllBeerList = posts;
        clearTableList();
        postListSuccess(posts);
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }

function postListSuccess(posts) {
    // Iterate over the collection of data
    $.each(posts, function (index, post) {
      // Add a row to the post table
      postAddRow(post);
    });
  }

function postAddRow(post) {
    // Check if <tbody> tag exists, add one if not
     if ($("#postTable tbody").length == 0) {
      $("#postTable").append("<tbody></tbody>");
     }
     // Append row to <table>
     $("#postTable tbody").append(
       postBuildTableRow(post));
   }

function postBuildTableRow(post) {
    var ret =
      "<tr>" +
       "<td>" + post.id + "</td>" +
       "<td>" + post.brand + post.name + "</td>" + 
       "<td>" + post.price + "</td>" +
       "<td>" + post.percentage + "</td>" +
       "<td>" +
        "<button type='button' " +
          "class='btn btn-default' " +
          "data-id='" + post.id + "'>" +
          "<i class='fas fa-comments'></i>" + 
        "</button>" +
      "</td>" +
      "</tr>";
    return ret;
  }

function clearTableList() {
    if ($("#postTable tbody").length == 0) {
        return;
    } else {
        $("#beertbody").remove();
        return;
    }
}

function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" + request.responseJSON.Message + "\n";
    }
    alert(msg);
}

function findItemInArray(post){

}