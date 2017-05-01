"use strict";

const express = require('express');
const router  = express.Router();
const db = require('../lib/util/data-helpers.js');
const getScreenShot = require('../lib/util/getscreenshot');

module.exports = () => {
  //calling datahelper to insert/update user table given fb_id
  router.post("/:user_id/register", (req, res) => {
    db.newUser(req.params.user_id)
      .then((results) => {
          res.sendStatus(200);
        })
      .catch((err) => {console.log(err)})
  });

  return router;
}
