const request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();

const ACCESS_TOKEN = '65ddbd7e019c2d7a060686af2131a939';

function getScreenShot(url, viewport, fullpage) {
  const url = 'http://google.com';
  const viewport = '&viewport=1440x900';
  const fullpage = '&fullpage=1';

  let options = {
    uri: `http://api.screenshotlayer.com/api/capture?access_key=${ACCESS_TOKEN}&url=${url}&viewport=${viewport}`,
    headers: {
      'User-Agent': 'Screen shot request - Student Project'
    }
  };

  request.get(options, (error, response, body) => {
    if (error) {
      console.log('Got an error: ', error);
      return;
    }
    if (response.statusCode == 200) {
      console.log('Response Status Code: ', response.statusCode);
      console.log('response: ', response);
      console.log('body: ', body);
    }
  });
}
