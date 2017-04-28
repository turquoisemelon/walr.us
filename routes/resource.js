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

  return router;
}
