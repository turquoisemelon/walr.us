$(document).ready(function() {

  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/resource"
    }).done((response) => {
      //these are the two ways we can access the data being returned by the routes
      //either as a single roll of data with many fields response[0].x
      //or as an array of objects for (x of response){...}

      // console.log(response[0].a);

      // for(tag of response) {
      //   $("<div>").text(tag.a).appendTo($("body"));
      // }
    });
  });

//initalizing FB javascript SDK
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '798380160331558',
      xfbml      : true,
      version    : 'v2.9'
  });

  FB.Event.subscribe('auth.statusChange', function(response) {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          console.log(response);
          console.log(response.authResponse.userID);
          addEntryToDb(response.authResponse.userID);
          // ajax post sends data to server
        } else if (response.status === 'not_authorized') {
          console.log("not_authorized");
        } else {
          // not_logged_in
          console.log('not connected');
        }
    });
  // do something with response
    console.log('something changed with status');
  });

  };

  function addEntryToDb(userId) {
    $.ajax({
      url: '/',
      method: 'POST',
      data: userId
    }).done(function(data) {
      // load the page with the new resource
      console.log('data of ajax call', data);
      console.log('the ajax request is successfull');
    });
  }

  (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // function createTweetElement(tweet) {
  //   let $tweet =
  //     `<article class="tweet-container">
  //               <header class="user"><img src="${tweet.user.avatars.small}">
  //                   <h2 class="name"> ${tweet.user.name}</h2>
  //                   <span class="handle"> ${tweet.user.handle} </span>
  //               </header>
  //               <section class="content">
  //                   <p class="message" >${tweet.content.text}</p>
  //               </section>
  //               <span class="tweet-footer">
  //                   <span class="created_at">${timeSince(tweet.created_at)}</span>
  //                   <i class="fa fa-flag" aria-hidden="true"></i>
  //                   <i class="fa fa-retweet" aria-hidden="true"></i>
  //                   <i class="fa fa-heart" aria-hidden="true"></i>
  //               </span>
  //           </article>`
  //   return $tweet;
})
