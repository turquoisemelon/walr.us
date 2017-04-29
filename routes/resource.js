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

  router.post("/api/resource", (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    const url = req.body.text;
    const viewport = '&viewport=1440x900';
    const fullpage = '&fullpage=1';

    const user = `userid coming from facebook`;
    const resource = {
      userID: user,
      content: {
        url: url,
        title: req.body.Title,
        description: req.body.Description,
        img_path: getScreenShot.getScreenShot(url, viewport, fullpage, (path) => {
                    console.log('path: ', path);
                    return path;
                  })
      },
    };

    console.log('resource url posted successfully');
  })

  return router;
}
