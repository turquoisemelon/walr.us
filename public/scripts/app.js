$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

$(document).ready(function() {
  function createTweetElement(tweet) {
    let $tweet =
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
    return $tweet;
  }


$(window).ready(function() {
    var comment_callback = function(response) {
        console.log("comment_callback");
        console.log(response);
    }
    FB.Event.subscribe('comment.create', comment_callback);
    FB.Event.subscribe('comment.remove', comment_callback);
});

FB.login(function(response) {
  if (response.status === 'connected') {
    console.log("yes")
    // Logged into your app and Facebook.
  } else {
    // The person is not logged into this app or we are unable to tell.
  }
});

FB.getLoginStatus(function(response) {
    statusChangeCallback(response); console.log("Logged in");
    //If the person is logged into Facebook and your app, redirect them to your app's logged in experience.
});
