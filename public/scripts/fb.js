//initalizing FB javascript SDK
window.fbAsyncInit = function() {
  FB.init({
    appId      : '798380160331558',
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();
  console.log('should be first')
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
