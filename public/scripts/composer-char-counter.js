$(document).ready(function() {

  let limit = 140;

  $("#tweet-text").keyup(function(event) {
    
    const count = $(this).val().length;

    $("#word-count").html(limit - count);

    if (limit - count < 0) {
      $("#word-count").addClass("red-text");
    } else {
      if ($("#word-count").hasClass("red-text"))
        $("#word-count").removeClass("red-text");
    }
  });
});