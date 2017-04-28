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

    db.saveRating(1,2,5);
    db.saveResource(1,2,'lates webpage','this is a website where all your dreams come true','/path_of_stuff/asdfasdf.jpg');
    db.newUser(123478123);
  });

  return router;
}
