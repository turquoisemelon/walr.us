const request = require('request');
const fs = require('fs');
const dotenv = require('dotenv').config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;


function getScreenShot(url, viewport, fullpage, callback) {

  let options = {
    uri: `http://api.screenshotlayer.com/api/capture?access_key=${ACCESS_TOKEN}&url=${url}${viewport}${fullpage}`,
  };

  let randomlyGeneratedString = generateRandomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  request.get(options, (error, response, body) => {
    if (error) {
      console.log('Got an error: ', error);
      return;
    }
    if (response.statusCode == 200) {
      console.log('Response Status Code: ', response.statusCode);
      // console.log('response.req.path', response.req.path);
      const urlTest = `http://api.screenshotlayer.com${response.req.path}`;
      // console.log(urlTest);
      const filePath = `./public/images/${randomlyGeneratedString}.jpg`
      downloadImageByURL(urlTest, filePath, () => {
        console.log("file has been written");
        let filePathForHtml = filePath.replace('./public', "")
        callback(filePathForHtml);
      });
    }
  });
}

function generateRandomString(length, chars) {
  let result = "";
  for (var i = length; i > 0; i--) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
 return result;
}

function downloadImageByURL(url, filePath, cb) {
  request.get(url)
  .on('error', (err) => {
    throw err;
  })
  .on('response', (response) => {
    console.log('Response Status Code: ', response.statusCode);
    console.log('Downloading the image...');
  })
  .pipe(fs.createWriteStream(filePath))
  .on('finish', () => {
    cb();
    console.log('Download complete.');
  });
}

module.exports = {
  getScreenShot: getScreenShot,
  generateRandomString: generateRandomString
}
