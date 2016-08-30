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

function addBookmarkToPage(){
  var url = $("#url-input").val();
  var title = $("#title-input").val();
  console.log(url);
  console.log(title);


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
          '<span>'+title+'</span>'+
          '<a href='+url+" class='new-bookmark' target='_blank'>"+url+'</a>'+
          '<section id="buttons">'+
          '<button class="mark-as-read">Mark as Read</button>'+
          '<button class="remove-bookmark">Remove Bookmark</button>' +
          '</section>'+
        '</li>'
    );

    //clear inputs
    $("#title-input").val('');
    $("#url-input").val('');

    checkToDisableSubmit();
    updateTotalDisplay();
  }
}

function addReadClass(){


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

  if($(this).hasClass('read')){
    $(this).parent().remove();
    totalLinks--;
  }else{
    $(this).addClass('read');
  }
  updateTotalDisplay();

});

$("#my-bookmarks").on('click', '.mark-as-read', function(){
  if($(this).parent().siblings('a').hasClass('read')){
    $(this).parent().parent().remove();
    totalLinks--;
  }else{
    $(this).parent().siblings('a').addClass('read');
  }
  updateTotalDisplay();
});

$("#my-bookmarks").on('click', '.remove-bookmark', function() {
    $(this).parent().parent().remove();
    totalLinks--;
    updateTotalDisplay();
});
