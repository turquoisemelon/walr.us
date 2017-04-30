"use strict";

const express = require('express');
const router  = express.Router();
const db = require('../lib/util/data-helpers.js');
const getScreenShot = require('../lib/util/getscreenshot');

module.exports = () => {

  router.get('/:tag', (req,res) =>{
    db.getTagedResource(req.params.tag)
        .then((results) => {console.log(results.rows)});
      // .catch((err) =>{console.log(err)});
    });

  router.get('/', (req,res) =>{
    db.getRatedResources()
      .then((results) => {console.log(results.rows)})
      .catch((err) =>{console.log(err)});
    });

    return router;
}