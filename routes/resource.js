"use strict";

const express = require('express');
const router  = express.Router();
const bd = require('../lib/util/data-helpers.js');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    bd.test(knex)
    .then((results)=>{
      res.json(results)
    });
  });

  return router;
}
