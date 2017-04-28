"use strict";

const express = require('express');
const router  = express.Router();
const db = require('../lib/util/data-helpers.js');

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
    //data helper function should come here and save the image to the database
    console.log('resource url posted successfully');
  })

  return router;
}
