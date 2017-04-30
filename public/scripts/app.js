$(document).ready(function() {

  $(() => {
    $.ajax({
      method: "POST",
      url: `/user/${FB.getAuthResponse().userID}/register`
    }).done((response) => {
      //these are the two ways we can access the data being returned by the routes
      //either as a single roll of data with many fields response[0].x
      //or as an array of objects for (x of response){...}

      console.log('should have worked');

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

    FB.getLoginStatus();

    FB.Event.subscribe('auth.statusChange', function(response) {
      FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            console.log('something changed and now logged in');
          } else if (response.status === 'not_authorized') {
            console.log("something changed and now not_authorized");
          } else {
            console.log('something changed and now not connected');
          }
      });
    });

  };


  // function addEntryToDb(userId) {
  //   $.ajax({
  //     url: '/',
  //     method: 'POST',
  //     data: userId
  //   }).done(function(data) {
  //     // load the page with the new resource
  //     console.log('data of ajax call', data);
  //     console.log('the ajax request is successfull');
  //   });
  // }

  (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  // function createPostElement(post) {
  //   let $post =
  //   <article>
  //   <div class="col s4 asset">
  //       <article class="post-container">
  //           <header class="title">
  //               <p class="name"> ${fb.user.name}</p> <!-- http:/graph.facebook.com/USERID/picture/ -->
  //               <span class="tag"> ${post.tags} </span>
  //           </header>
  //           <section class="content">
  //               <div class="image">
  //                   <img src="http://i.ebayimg.com/images/g/IUUAAOSwv2JXwNU2/s-l500.jpg" alt="" />
  //                   <h3 class="truncate"><span>Title of Resource:<span class='spacer'></span><br/><span class='spacer'></span>Description</span>
  //                   </h3>
  //               </div>
  //           </section>

//             <span class="post-footer">
//     <div class="fb-comments" data-href="http://walr.us/1" data-width="320px" data-numposts="5"></div>
//             <span class="c-rating" id="counter0"></span>
//             <div class="fb-like" data-href="http://walr.us/1" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>
//             </span>
//         </article>
// return $post;
// };

// function renderPost(posts) {
//     var result = "";
//     posts.forEach(function(post) {
//       result = createPostsElement(post) + result
//     })
//     $('.post-area').html(result)
//   };

//   function loadPosts() {
//     $.ajax({
//       url: 'http://localhost:8080/post',
//       method: 'GET',
//       data: {
//         format: 'json'
//       },
//       success: function(data) {
//         renderPosts(data);
//       }
//     })
//   };
//   loadPosts();

//   $("#postarea").on("submit", function(event) {
//     event.preventDefault();
//     if ($("textarea").val() == "" || null) {
//       alert('Say Something')
//     }
//     if ($("textarea").val().length > 140) {
//       alert('Stahp')
//     } else {
//       $.ajax({
//         method: 'POST',
//         url: '/posts',
//         data: $('textarea').serialize(),
//         success: function() {
//           $('textarea').val('');
//           $('span.counter').html('140');
//           loadPosts();
//         }
//       });
//     }
//   });
// };



// }


})