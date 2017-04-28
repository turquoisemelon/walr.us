// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/resource"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.fb_id).appendTo($("body"));
//     }
//   });
// });

function renderResources(resources) {
  var $html = $('<div></div>');
  resources.forEach((resource)=> {
    var a = createResourceElement(resource);
    $html.prepend(a);
  })
  $(".container").html($html);
}

function loadResources() {
  $.ajax({
    url: `/api/resource`,
    method: 'GET',
    dataType: "json"
  }).done(renderResources(data))
}


function handleResourceSubmit(event) {
  console.log('Button clicked, performing ajax call...');
  event.preventDefault();
  var formDataStr = $(this).serialize();
  var textAreaContent = $('.postarea').val();

  if(textAreaContent === '') {
    return showNotificationBar('Please enter a text');
  } else if (textAreaContent.length > 140) {
    return showNotificationBar("Tweet is too long");
  } else {
    $.ajax({
      url: '/api/resource',
      method: 'POST',
      data: formDataStr
    }).done(function(data) {
      $('.postarea').val('');
      $('.counter').html(140);
      loadResources();
      console.log('the ajax request is successfull');
    });
  }
}

  function createResourceElement(resource) {
    let $resource =
      `<article class="tweet-container">
                <header class="user"><img src="${tweet.user.avatars.small}">
                    <h2 class="name"> ${tweet.user.name}</h2>
                    <span class="handle"> ${tweet.user.handle} </span>
                </header>
                <section class="content">
                    <p class="message" >${tweet.content.text}</p>
                </section>
                <span class="tweet-footer">
                    <span class="created_at">${timeSince(tweet.created_at)}</span>
                    <i class="fa fa-flag" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                </span>
            </article>`
    return $resource;
  }
