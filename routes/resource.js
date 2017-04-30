"use strict";

const express = require('express');
const router  = express.Router();
const db = require('../lib/util/data-helpers.js');
const getScreenShot = require('../lib/util/getscreenshot');

module.exports = () => {

  router.get("/", (req, res) => {

    //as you can see there are more data-helpers than there are routes
    //this means some routes will need to use more than one data helper to complete the task
    //when doing so we should make sure to use promises to avoid async issues

    // retrieving all the detailed response of a resouce given id

    // db.getResourceDetails(3)
    //   .then((results) => {
    //     res.json(results)
    //   })

    //example of how one would pull average rating of a resource
    //by passing in resource_id
    db.avgRating (3)
      .then((results) => {
        res.json(results)
      })


    //examples of how to save data to the database
    //it is crucial to include the promise otherwise nothing will happen

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

  router.post("/:resource_id/rating", (req,res) => {
    db.saveRating(req.body.user_id, req.params.resource_id, req.body.rating)
      .then((results) => {})
      .catch((err) =>{console.log(err)});
  });

  router.post("/api/resource", (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    const url = req.body.text;
    const viewport = '&viewport=1440x900';
    const fullpage = '&fullpage=1';

    const user = `userid coming from facebook`;
    const resource = {
      userID: user,
      content: {
        url: url,
        title: req.body.Title,
        description: req.body.Description,
        img_path: getScreenShot.getScreenShot(url, viewport, fullpage, (path) => {
                    console.log('path: ', path);
                    return path;
                  })
      },
    };
    console.log('resource url posted successfully');
  })

  return router;
}
