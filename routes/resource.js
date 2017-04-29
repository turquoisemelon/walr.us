"use strict";

const express = require('express');
const router  = express.Router();
const db = require('../lib/util/data-helpers.js');

module.exports = () => {

  router.get("/", (req, res) => {
    // db.test('fb_id')
    // .then((results)=>{
    //   res.json(results)
    // })

    db.getResourceDetails(3)
      .then((results) => {
        res.json(results)
      })

    // db.newUser(123478123)
    // .then((results) => {})
    // db.saveRating(1,1,1)
    // .then((results) => {console.log(results)})
    // .catch((err) =>{console.log(err)});
    // db.saveResource(1,2,'lates webpage'
    //   ,'this is a website where all your dreams come true'
    //   ,'/path_of_stuff/asdfasdf.jpg')
    // .then((results) => {});
  });

  return router;
}
