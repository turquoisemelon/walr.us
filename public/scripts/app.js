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
<<<<<<< HEAD
=======

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

>>>>>>> 11951e124b83304fae197c8a654638e58a84cb37
  (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

<<<<<<< HEAD

  function createPostElement(post) {
    let $post =     
    <article>
    <div class="col s4 asset">
        <article class="post-container">
            <header class="title">
                <p class="name"> ${fb.user.name}</p> <!-- http:/graph.facebook.com/USERID/picture/ -->
                <span class="tag"> ${post.tags} </span>
            </header>
            <section class="content">
                <div class="image">
                    <img src="http://i.ebayimg.com/images/g/IUUAAOSwv2JXwNU2/s-l500.jpg" alt="" />
                    <h3 class="truncate"><span>Title of Resource:<span class='spacer'></span><br/><span class='spacer'></span>Description</span> 
                    </h3>
                </div>
            </section>

            <span class="post-footer">
    <div class="fb-comments" data-href="http://walr.us/1" data-width="320px" data-numposts="5"></div>
            <span class="c-rating" id="counter0"></span>
            <div class="fb-like" data-href="http://walr.us/1" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>
            </span>
        </article>
return $post;
};

function renderPost(posts) {
    var result = "";
    posts.forEach(function(post) {
      result = createPostsElement(post) + result
    })
    $('.post-area').html(result)
  };

  function loadPosts() {
    $.ajax({
      url: 'http://localhost:8080/post',
      method: 'GET',
      data: {
        format: 'json'
      },
      success: function(data) {
        renderPosts(data);
      }
    })
  };
  loadPosts();

  $("#postarea").on("submit", function(event) {
    event.preventDefault();
    if ($("textarea").val() == "" || null) {
      alert('Say Something')
    }
    if ($("textarea").val().length > 140) {
      alert('Stahp')
    } else {
      $.ajax({
        method: 'POST',
        url: '/posts',
        data: $('textarea').serialize(),
        success: function() {
          $('textarea').val('');
          $('span.counter').html('140');
          loadPosts();
        }
      });
    }
  });
};



}

=======
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
>>>>>>> 11951e124b83304fae197c8a654638e58a84cb37
