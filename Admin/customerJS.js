var AllCustomerList;

$('#myFormAddC').on('submit',function(e){
    e.preventDefault();

    var  firstName = $('#myFormAddC').find('.firstName').val();
    var  lastName = $('#myFormAddC').find('.lastName').val();
    var  email = $('#myFormAddC').find('.email').val();
    var  address = $('#myFormAddC').find('.address').val();
    var  phoneNum = $('#myFormAddC').find('.phoneNum').val();

    $.ajax({
        url: "https://ipcsmmd-webshop-group16.azurewebsites.net/api/customers/",
        type: 'POST',
        data: JSON.stringify({
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "address": address,
            "phonenumber": phoneNum}),
        processData: false,
        contentType: 'application/json',
        success: function (post) {
            AllCustomerList.push(post);
            clearTableListC();
            postListSuccessC(AllCustomerList);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
});

$('#myFormUpdateC').on('submit',function(e){
    e.preventDefault();

    var  id = $('#myFormUpdateC').find('.id').val();
    var  firstName = $('#myFormUpdateC').find('.firstName').val();
    var  lastName = $('#myFormUpdateC').find('.lastName').val();
    var  email = $('#myFormUpdateC').find('.email').val();
    var  address = $('#myFormUpdateC').find('.address').val();
    var  phoneNum = $('#myFormUpdateC').find('.phoneNum').val();

    $.ajax({
        url: "https://ipcsmmd-webshop-group16.azurewebsites.net/api/customers/" + id,
        type: 'PUT',
        data: JSON.stringify({
            "id": id,
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "address": address,
            "phonenumber": phoneNum}),
        processData: false,
        contentType: 'application/json',
        success: function (post) {
            findAndReplace(AllCustomerList.find(x => x.id == id), post);
            clearTableListC();
            postListSuccessC(AllCustomerList);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
});

$('#myFormDeleteC').on('submit',function(e){
    e.preventDefault();

    var  id = $('#myFormDeleteC').find('.id').val();
    console.log(id);

    $.ajax({
        url: "https://ipcsmmd-webshop-group16.azurewebsites.net/api/customers/" + id,
        type: 'DELETE',
        processData: false,
        contentType: 'application/json',
        success: function (post) {
            findAndReplace(post, null)
            clearTableListC();
            postListSuccessC(AllCustomerList);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
});

function postListC() {
    // Call Web API to get a list of post
    $.ajax({
      url: 'https://ipcsmmd-webshop-group16.azurewebsites.net/api/customers/',
      type: 'GET',
      dataType: 'json',
      success: function (posts) {
        AllCustomerList = posts;
        clearTableListC();
        postListSuccessC(posts);
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }

function postListSuccessC(posts) {
    // Iterate over the collection of data
    $.each(posts, function (index, post) {
      // Add a row to the post table
      postAddRowC(post);
    });
  }

function postAddRowC(post) {
    // Check if <tbody> tag exists, add one if not
     if ($("#postTableC tbody").length == 0) {
      $("#postTableC").append("<tbody id='custtbody'></tbody>");
     }
     // Append row to <table>
     $("#postTableC tbody").append(
       postBuildTableRowC(post));
   }

function postBuildTableRowC(post) {
    var ret =
      "<tr>" +
         "<td>" + post.id + "</td>" +
         "<td>" + post.firstName + "</td>" + 
         "<td>" + post.lastName + "</td>" +
         "<td>" + post.email + "</td>" + 
         "<td>" + post.address + "</td>" +
         "<td>" + post.phoneNumber + "</td>" +
      "</tr>";
    return ret;
  }

function clearTableListC() {
    if ($("#postTableC tbody").length == 0) {
        return;
    } else {
        $("#custtbody").remove();
        return;
    }
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

function findAndReplace(oldItem, newItem) {
    var foundIndex = AllCustomerList.findIndex(x => x.id == oldItem.id);
    if (newItem == null) {
        AllCustomerList.splice(foundIndex, 1);
    } else {
      AllCustomerList[foundIndex] = newItem;  
    }
}