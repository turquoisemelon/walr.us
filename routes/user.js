"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser')
const db = require('../lib/util/data-helpers.js');
const getScreenShot = require('../lib/util/getscreenshot');

module.exports = () => {
  //calling datahelper to insert/update user table given fb_id
  router.post("/:user_id/register", (req, res) => {
    db.newUser(req.params.user_id)
      .then((results) => {
          res.sendStatus(200);
        })
      .catch((err) =>{console.log(err)})
  });

  router.post("/resource/:user_id/new", (req, res) => {
    // if (!req.body.json) {
    //   res.sendStatus(400).json({ error: 'invalid request: no data in POST body'});
    //   return;
    // }
    const url = req.body.url;
    const user_id = req.params.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const tags = req.body.tags;
    const viewport = '&viewport=1440x900';
    const fullpage = '&fullpage=1';
    //call function to download img given url
    let img_path;

    //save to resource given all input info + img_path returning resource_id

    //capture input tags

    //get all existing tags

    //for tags not in existing tags save to db after recieving resource_id
  });

  return router;
}
