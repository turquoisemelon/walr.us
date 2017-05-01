
var p1 = new Promise ((resolve, reject)=>{
  db.getAllResources("",(err,data)=>{
    if (err) return reject(err)
      resolve(data);
  })
}).then (function(data){});
.then (function(data){});
.then (function(data){return 10;});
.then (function(data){return p2()});
.then (function(data){return p3});

var promise = db.getAllResources()
promise.then(function(){console.log(bears)})

router.get("/resource", (req, res) => {

})


"use strict";
require('dotenv').config();
const express     = require("express");
const app         = express();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

//inserts a new record to the ratings table
function saveRating (user_id, resource_id, rating){
  return knex('ratings').returning('*')
    .insert([{
          user_id: user_id,
          resource_id: resource_id,
          rating: rating
        }]);
}
//inserts a new resource to the resources table
function saveResource (user_id, url, title, description, img_path){
  return knex('resources')
    .returning('id')
    .insert([{
          user_id : user_id,
          url : url,
          title : title,
          description : description,
          img_path : img_path
        }]);
}
//creates a new user in the users table given fb_id
function newUser (fb_id){
  return knex('users')
    .insert([{fb_id : fb_id}]);
}
//retrieves url & description for a resource given resource_id
function getResourceDetails (resource_id){
  return knex
    .select('url', 'description')
    .from('resources')
    .where('id', resource_id);
}

//creating a new tag
function saveTag (tag){
  return knex('tags')
    .returning('id')
    .insert([{
      tag : tag
    }]);
}
//fetching all tags
function getAllTags (){
  return knex.select('id', 'tag').from('tags');
}

//associating tag to resource  R,Q:"can multiple tags be sent, or must there be seperate setTag's for each tag"
function setTag (resource_id, tag_id){
  return knex('resource_tags')
    .insert([{
      resource_id : resource_id,
      tag_id : tag_id
    }]);
}
//fetching tags associated with a resource given resource_id
function getTags (resource_id){
  return knex('tags')
    .join('resource_tags', 'tags.id', 'resource_tags.tag_id')
    .where('resource_tags.resource_id', resource_id )
    .select('tags.tag as tag');
}
//fetch avg rating given resource_id
function avgRating (resource_id){
  return knex('ratings')
    .where('resource_id', resource_id)
    .avg(`rating as a`);
}
//fetch all resources
function getAllResources (){
  return knex
    .select('*')
    .from('resources');
}
//fetch all resources given tag
function getResourcesByTag (tag){
  return knex('resource_tags')
    .join('resources', 'resource_tags.resource_id', 'resources.id')
    .join('tags', 'tags.id', 'resource_tags.tag_id')
    .where('tags.tag', tag)
    .select('resources.*');
}

function getTagID (tag){
  return knex('tags')
    .where('tag', tag)
    .select('id');
}
// functions to save comments and likes that are no longer needed since FB graph API will
// handle these features

// function saveComment (user_id, resource_id, body){
//   return  knex('comments')
//     .insert({
//       user_id : user_id,
//       resource_id : resource_id,
//       body : body
//     });
// }

// function saveLike (user_id, resource_id){
//   return knex('likes')
//     .insert({
//       user_id : user_id,
//       resource_id : resource_id
//     });
// }

module.exports = {
  // saveComment : saveComment,
  // saveLike : saveLike,
  saveRating : saveRating,
  saveResource : saveResource,
  newUser : newUser,
  getResourceDetails : getResourceDetails,
  saveTag : saveTag,
  getAllTags : getAllTags,
  setTag : setTag,
  getTags : getTags,
  getAllResources : getAllResources,
  getResourcesByTag : getResourcesByTag,
  avgRating : avgRating,
  getTagID : getTagID
}


"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser')
const db = require('../lib/util/data-helpers.js');
const getScreenShot = require('../lib/util/getscreenshot');

module.exports = () => {
  //calling datahelper to insert/update user table given fb_id
  router.post("/:user_id/register", (req, res) => {
    db.newUser(req.params.user_id)
      .then((results) => {
          res.sendStatus(200);
        })
      .catch((err) => {console.log(err)})
  });

  router.post("/resource/:user_id/new", (req, res) => {

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

  return router;
}



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


"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
// const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

// const knexConfig  = require("./knexfile");
// const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
// const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const resourceRoutes = require("./routes/resource");
const userRoutes = require("./routes/user");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
// app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all routes
app.use("/resource", resourceRoutes());
app.use("/user", userRoutes());
// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
