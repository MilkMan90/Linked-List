var totalLinks = 0;
var totalUnreadLinks = 0;
var totalReadLinks = 0;


function checkToDisableSubmit(){
  if((!$("#title-input").val())||(!$("#url-input").val())){
    $('#add-button').prop('disabled', true);
  }
}

function updateTotalDisplay(){

  totalReadLinks = $('.read').length;
  totalUnreadLinks = totalLinks - totalReadLinks;

  $("#total-links").html("Total Links: "+totalLinks);
  $("#total-read-links").html("Total Read Links: "+totalReadLinks);
  $("#total-unread-links").html("Total Unread Links: "+totalUnreadLinks);
}

function checkValidURL(input){
  // var urlArray = input.split('');
  // if(urlArray[0]==='h' && urlArray[1]==='t' && urlArray[2]==='t' && urlArray[3]==='p' && urlArray[4]==='s' &&
  //   urlArray[5]===':' && urlArray[6]==='/' && urlArray[7]==='/'){
  //     return true;
  //   } else{
  //     return false;
  //   }

  var urlStatus = input.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

  if(urlStatus === null){
      return false;
    } else{
      return true;
    }
}

function addBookmarkToPage(){
  var url = $("#url-input").val();
  var title = $("#title-input").val();

  if(!checkValidURL(url)){
    //add error message
    $(".error-message").css('visibility', 'visible');
    $("#url-input").addClass('red-error');
    return;
  }else{
    $(".error-message").css('visibility', 'hidden');
  }

  if(!$("#title-input").val()){
    $("#title-input").addClass('red-error');
    $("#title-input").siblings('span').addClass('red-error');
  }

  if(!$("#url-input").val()){
    $("#url-input").addClass('red-error');
    $("#url-input").siblings('span').addClass('red-error');
  }

  if($("#title-input").val() && $("#url-input").val()){
    totalLinks++;
    $("#my-bookmarks").append(
        '<li>' +
          '<div class="container">'+
            '<span>'+title+'</span>'+
            '<a href='+url+" class='new-bookmark' target='_blank'>"+url+'</a>'+
            '<section class="buttons">'+
              '<button class="mark-as-read">Mark as Read</button>'+
              '<button class="remove-bookmark">Remove Bookmark</button>' +
            '</section>'+
          '</div>'+
        '</li>'
    );

    //clear inputs
    $("#title-input").val('');
    $("#url-input").val('');

    checkToDisableSubmit();
    updateTotalDisplay();
  }
}

//run once on page load
checkToDisableSubmit();
updateTotalDisplay();

// Add new bookmark with associated 'remove' link when 'add' button is clicked.
$('#add-button').on('click', function() {
    addBookmarkToPage();
});

$('#url-input').bind("enterKey",function(e){
   addBookmarkToPage();
});

$('#title-input').bind("enterKey",function(e){
   addBookmarkToPage();
});

$('#url-input').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

$('#title-input').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

//remove error class when key is pressed inside input boxes
$('#url-input').on('keyup', function(){
  if($("#url-input").val()){
    $("#url-input").removeClass('red-error');
    $("#url-input").siblings('span').removeClass('red-error');
    $('#add-button').prop('disabled', false);
  }
  checkToDisableSubmit();
});

$('#title-input').on('keyup', function(){
  if($("#title-input").val()){
    $("#title-input").removeClass('red-error');
    $("#title-input").siblings('span').removeClass('red-error');
    $('#add-button').prop('disabled', false);
  }
  checkToDisableSubmit();
});

$('#clear-all-read').on('click', function(){
  $(".read").parent().remove();
  totalLinks = totalLinks - totalReadLinks;
  totalReadLinks = 0;
  updateTotalDisplay();
});

$('#my-bookmarks').on('click', 'a', function(){
  if($(this).parent().hasClass('read')){
    $(this).parent().parent().remove();
    totalLinks--;
  }else{
    $(this).parent().addClass('read');
  }
  updateTotalDisplay();
});

$("#my-bookmarks").on('click', '.mark-as-read', function(){

  $(this).parent().parent().toggleClass('read');
  updateTotalDisplay();
});

$("#my-bookmarks").on('click', '.remove-bookmark', function() {
    $(this).parent().parent().parent().remove();
    totalLinks--;
    updateTotalDisplay();
});
