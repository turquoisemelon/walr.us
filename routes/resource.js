"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // localhost:8080/api/resource/
  router.get("/", (req, res) => {
    // data helper will come here
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/", (req, res) => {
    if(err) {
      console.error('post is not successful');
      throw err;
    }
    console.log('resource url posted successfully');
  })

  return router;
}
