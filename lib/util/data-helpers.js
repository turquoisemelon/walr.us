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
// function getResourceDetails (resource_id){
//   return knex
//     .select('url', 'description')
//     .from('resources')
//     .where('id', resource_id);
// }

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
// function getTags (resource_id){
//   return knex('tags')
//     .join('resource_tags', 'tags.id', 'resource_tags.tag_id')
//     .where('resource_tags.resource_id', resource_id )
//     .select('tags.tag as tag');
// }
//fetch avg rating given resource_id
// function avgRating (resource_id){
//   return knex('ratings')
//     .where('resource_id', resource_id)
//     .avg(`rating as a`);
// }
//fetch all resources
// function getAllResources (){
//   return knex
//     .select('*')
//     .from('resources');
// }
//fetch all resources given tag
// function getResourcesByTag (tag){
//   return knex('resource_tags')
//     .join('resources', 'resource_tags.resource_id', 'resources.id')
//     .join('tags', 'tags.id', 'resource_tags.tag_id')
//     .where('tags.tag', tag)
//     .select('resources.*');
// }

function getRatedResources (){
  return knex.raw(
    `select resources.*, rating.avg
    from resources
    join (
      select resource_id, avg(rating) AS avg
      from ratings
      group by resource_id
    ) AS rating
    on resources.id = rating.resource_id`)
}

function getTagedResource (tag){
  return knex.raw(
    `select resources.*
      from resource_tags
      join
        tags on tags.id = resource_tags.tag_id
      join
        (select resources.*, rating.avg
        from resources
        join (
          select resource_id, avg(rating) AS avg
          from ratings
          group by resource_id
          ) AS rating
        on resources.id = rating.resource_id) AS resources
      on resource_tags.resource_id = resources.id
      where tags.tag = '${tag.toString()}'`)
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
  // getResourceDetails : getResourceDetails,
  saveTag : saveTag,
  getAllTags : getAllTags,
  setTag : setTag,
  getTagID : getTagID,
  // getTags : getTags,
  // getAllResources : getAllResources,
  // getResourcesByTag : getResourcesByTag,
  // avgRating : avgRating,
  getRatedResources : getRatedResources,
  getTagedResource : getTagedResource
}
