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

  router.post("/:user_id/new", (req, res) => {

    const url = req.body.url;
    const user_id = req.params.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const tags = req.body.tags;
    const viewport = '&viewport=1440x900';
    const fullpage = '&fullpage=1';
    let img_path;
    let existingTags = [];
    let newTags = [];
    let newResource_id;

    db.getAllTags()
    .then((results) => {
      results.forEach((tag) => {
        //collect all existing tags
        existingTags.push(tag.tag);
      });
      //find all the new tags if any
      tags.forEach((tag) => {
        if(existingTags.indexOf(tag) < 0){
          newTags.push(tag);
        }
        }
      )
      //save the new tags
      newTags.forEach((tag) =>{
          db.saveTag(tag).then((result)=>{});
      });
    })
    .then((results) => {
      //save the resource and return the new resource_id
      getScreenShot.getScreenShot(url, viewport, fullpage, (img_path) => {
        db.saveResource(user_id, url, title, description, img_path)
        .then((resource_id) => {
          //saving the resource_id
          newResource_id = resource_id[0];
        })
        .then(()=>{
          //creating new resource_tag relationships based on resoruce_id & tag_id
          tags.forEach((tag) => {
            db.getTagID(tag).then((results) => {
              db.setTag(newResource_id, results[0].id)
              .then((results)=>{});
            });
          })
        });
      })
    })
  });
  
  router.get('/', (req,res) =>{
    db.getRatedResources()
      .then((results) => {console.log(results.rows)})
      .catch((err) =>{console.log(err)});
    });

    return router;
}
