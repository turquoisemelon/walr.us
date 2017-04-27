// var exports = module.exports = function() {

window.fbAsyncInit = function() {
  FB.init({
    appId: '798380160331558',
    cookie: true,
    xfbml: true,
    version: 'v2.9'
  });
  FB.AppEvents.logPageView();
  $(document).trigger('fbload');
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return; }
  js = d.createElement(s);
  js.id = id;
  js.src = "http://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
  console.log(response);
  if (response.status === 'connected') {
    console.log('Succesful login456')
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
    console.log('3')
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    console.log('1')
  });
}

$(document).on(
  'fbload',
  function() {
    FB.login(function(response) {
      if (response.status === 'connected') {
        console.log('Successful login123')
          // Logged into your app and Facebook.
      } else {
        console.log('No good')
          // The person is not logged into this app or we are unable to tell. 
      }
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
      console.log("Logged in234");
      //If the person is logged into Facebook and your app, redirect them to your app's logged in experience. 
    });
  });
// }
