var totalLinks = 0;
var totalUnreadLinks = 0;
var totalReadLinks = 0;


function checkToDisableSubmit(){
  if((!$("#title-input").val())||(!$("#url-input").val())){
    $('#add-button').prop('disabled', true);
  }
}

function updateTotalDisplay(){
  $("#total-links").html("Total Links: "+totalLinks);
  $("#total-read-links").html("Total Read Links: "+totalReadLinks);
  $("#total-unread-links").html("Total Unread Links: "+totalUnreadLinks);
}


//run once on page load
checkToDisableSubmit();
updateTotalDisplay();

// Add new bookmark with associated 'remove' link when 'add' button is clicked.
$('#add-button').on('click', function() {
    console.log('test');
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
      totalUnreadLinks++;
      $("#my-bookmarks").append(
          '<li>' +
            '<a href="'+url+'class = "new-bookmark" target="_blank">'+title+'</a>'+
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

$("#my-bookmarks").on('click', '.remove-bookmark', function() {
    $(this).parent().parent().remove();
    totalLinks--;
    if($(this).parent().siblings('a').hasClass('read')){
      totalReadLinks--;
    }else{
      totalUnreadLinks--;
    }
    updateTotalDisplay();
});
