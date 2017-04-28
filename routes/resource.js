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

    db.saveComment(1,2,'this shit is whack');
    db.saveRating(1,2,5);
    db.saveResource(1,)
  });

  return router;
}
