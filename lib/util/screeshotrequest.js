const request = require('request');
const fs = require('fs');
const http = require('http');
// const dotenv = require('dotenv').config();

const ACCESS_TOKEN = 'e005db6bbbe0c112977c029baeac5fe2';

function getScreenShot(url, viewport, fullpage) {

  let options = {
    uri: `http://api.screenshotlayer.com/api/capture?access_key=${ACCESS_TOKEN}&url=${url}${viewport}${fullpage}`,
  };

  request.get(options, (error, response, body) => {
    if (error) {
      console.log('Got an error: ', error);
      return;
    }
    if (response.statusCode == 200) {
      console.log('Response Status Code: ', response.statusCode);
      console.log('response.req.path', response.req.path);
      const urlTest = `http://api.screenshotlayer.com${response.req.path}`;
      console.log(urlTest);
      downloadImageByURL(urlTest, filePath, () => {console.log("file has been written");});
      return urlTest;
    }
  });
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

const url = 'http://google.ca';
const viewport = '&viewport=1440x900';
const fullpage = '&fullpage=1';
const filePath = `./public/images/test2.jpg`

getScreenShot(url, viewport, fullpage);
