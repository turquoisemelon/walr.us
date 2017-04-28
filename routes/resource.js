"use strict";

const express = require('express');
const router  = express.Router();
const db = require('../lib/util/data-helpers.js');
const getScreenShot = require('../lib/util/getscreenshot');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    db.test(knex)
    .then((results)=>{
      res.json(results)
    });
  });

  router.post("/", (req, res) => {
    if(err) {
      console.error('post is not successful');
      throw err;
    }
    const url = 'http://github.com';
    const viewport = '&viewport=1440x900';
    const fullpage = '&fullpage=1';

    getScreenShot.getScreenShot(url, viewport, fullpage, (path) => {
      console.log('path: ', path);
      return path;
    });
    //data helper function should come here and save the image to the database
    console.log('resource url posted successfully');
  })

  return router;
}
