$(document).ready(function() {
  $(".new-post").hide();
  $(".add-resource-button").click(function(){
    $(".new-post").slideToggle("fast", function (){});
    const $this = $(this);
    $this.toggleClass('add-resource-button');
    if($this.hasClass('add-resource-button')){
      $this.text('ADD RESOURCE');
    } else{
      $this.text('CANCEL');
    }
  });


  $('.chips').material_chip();
$('.chips-initial').material_chip({
  data: [{
    tag: 'Apple',
  }, {
    tag: 'Microsoft',
  }, {
    tag: 'Google',
  }],
});
$('.chips-placeholder').material_chip({
  placeholder: 'Enter a tag',
  secondaryPlaceholder: '+Tag',
});
$('.chips-autocomplete').material_chip({
  autocompleteOptions: {
    data: {
      'Apple': null,
      'Microsoft': null,
      'Google': null
    },
    limit: Infinity,
    minLength: 1
  }
});
});
