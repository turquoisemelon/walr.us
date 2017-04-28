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
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    const url = 'http://github.com';
    const viewport = '&viewport=1440x900';
    const fullpage = '&fullpage=1';

    // const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    // const tweet = {
    //   user: user,
    //   content: {
    //     text: req.body.text
    //   },
    //   created_at: Date.now()
    // };

    // getScreenShot.getScreenShot(url, viewport, fullpage, (path) => {
    //   console.log('path: ', path);
    //   return path;
    // });
    console.log(req.body);

    //data helper function should come here and save the image to the database
    console.log('resource url posted successfully');
  })

  return router;
}
