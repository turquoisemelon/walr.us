$(document).ready(function() {
  $(".new-post").hide();
  $(".add-resource-button").click(function(){
    $(".new-post").slideToggle("fast", function (){});
  });
});
