$(document).ready(function() {

  // $(() => {
  //   $.ajax({
  //     method: "POST",
  //     url: `/user/${FB.getAuthResponse().userID}/register`
  //   }).done((response) => {
  //     //these are the two ways we can access the data being returned by the routes
  //     //either as a single roll of data with many fields response[0].x
  //     //or as an array of objects for (x of response){...}

  //     console.log('should have worked');

  //     // for(tag of response) {
  //     //   $("<div>").text(tag.a).appendTo($("body"));
  //     // }
  //   });
  // });

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
            //handling user logging in & saving them to DB if needed
            $(() => {
              $.ajax({
                method: "POST",
                url: `/user/${FB.getAuthResponse().userID}/register`
              }).done((response) => {
                console.log('saved new user');
              });
            });


            $('.postarea').on('submit', function () {
                event.preventDefault();
                const url = $('#input-url').val();
                const title = $('#input-title').val();
                const description = $('#input-description').val();
                const tags = function(){
                  let arr = [];
                  for(let i = 0; i < $('.chip').length; i++){
                    arr.push($('.chip')[i].textContent.replace('close', ''))
                  }
                  return arr;
                }
                $.ajax({
                  method: "POST",
                  url: `/resource/${FB.getAuthResponse().userID}/new`,
                  data: {
                    url : url,
                    title : title,
                    description : description,
                    tags : tags()
                  }
                }).done((response) => {
                  //these are the two ways we can access the data being returned by the routes
                  //either as a single roll of data with many fields response[0].x
                  //or as an array of objects for (x of response){...}
                  console.log(response);
                  console.log('should have worked');

                });

              });


  function createPostElement(post) {
    let $post =
      `<article>
        <div class="col s4 asset">
          <div class="card medium">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${post.img_path}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
              <p><a href="#">${post.url}</a></p>
            </div>
            <div class="card-action">
                <a href="#"><i class="small material-icons">thumb_up</i></a>
                <a href="#"><i class="small material-icons">comment</i></a>
                <a href="#"><i class="small material-icons">grade</i></a>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
              <p>${post.description}</p>
            </div>
          </div>
          <div class="fb-comments-section">
            <span class="post-footer">
              <div class="fb-comments" data-href="http://walr.us/${post.id}" data-width="320px" data-numposts="5"></div>
              <span class="c-rating" id="counter${post.id}"></span>
              <div class="fb-like" data-href="http://walr.us/${post.id}" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>
            </span>
          </div>
        </div>
      </article>`
    return $post;
  }

  function renderPosts(posts) {
    var result = "";
    posts.forEach(function(post) {
      console.log(post)
      result = createPostElement(post) + result
    })
    // console.log(result)
    $('#asset-area').html(result)
  };

 function loadPosts() {
    $.ajax({
      url: '/resource',
      method: 'GET',
      data: {
        format: 'json'
      },
      success: function(data){renderPosts(data)}
    })
  };
  loadPosts();

             // $('.brand-logo').on('click', function () {
             //    event.preventDefault();
             //    $.ajax({
             //      method: "POST",
             //      url: "/resource/2/rating",
             //      data: {
             //        user_id : 1,
             //        rating : 0
             //      }
             //    }).done((response) => {
             //      //these are the two ways we can access the data being returned by the routes
             //      //either as a single roll of data with many fields response[0].x
             //      //or as an array of objects for (x of response){...}
             //      console.log(response);
             //      console.log('should have worked');

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



})
