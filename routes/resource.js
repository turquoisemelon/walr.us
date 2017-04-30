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

  router.get('/', (req,res) =>{
    db.getRatedResources()
      .then((results) => {console.log(results.rows)})
      .catch((err) =>{console.log(err)});
    });

    return router;
}

//   router.get("/resource", (req, res) => {
//     const obj = []
//        db.getAllResources()
//          .then((results) => {
//              res.sendStatus(200);
//              obj.push(results)
//              let resourceID = [];
//              for (let i = 0; i < results.length; i++) {
//                resourceID = results[i]["id"];
//                // results[i].rating = 
//               db.avgRating(resourceID)
//               .then((resulted) => {
//                 results[i].rating = resulted[0]['a'];
//                 cosole.log()
//                 obj[results[i].rating] = obj;
//                 // console.log(results[i].rating);
//                //this needs to be a function here
//                // let Averaged = "";  
//                // for (let j = 0; j < resulted.length; j++) {
//                //  results[i].rating = resulted[j]["a"];
//                // }
//               // console.log(Averaged)
//              // results[i].rating = Averaged;
//           // console.log(results);
//               })
//               console.log(obj);
//              // .finally(results)
//               }
//       })
// }

//for each ID in results, find the corresponding results_id in ratings
//then using jquery set the currentRating to the found avgRating by '#counter'id''

// for (var i; var i < results.length; i++)
// function findRating(){}
//           function findRating(results, results[i][id], property) {
//     for(var i = 0, len = myArray.length; i < len; i++) {
//         if (myArray[i][property] === searchTerm) return i;
//     }
//     return -1;
// }
// findRating(arr, "stevie", "hello"); 
          // console.log(results);
//           for each (var rates in results.id)
       

  //     .catch((err) => {console.log("this is very bad" + err)})
  // });


  // return router;
// }

//   router.post("/api/resource", (req, res) => {
//     if (!req.body.text) {
//       res.status(400).json({ error: 'invalid request: no data in POST body'});
//       return;
//     }
//     const url = req.body.text;
//     const viewport = '&viewport=1440x900';
//     const fullpage = '&fullpage=1';

//     const user = `userid coming from facebook`;
//     const resource = {
//       userID: user,
//       content: {
//         url: url,
//         title: req.body.Title,
//         description: req.body.Description,
//         img_path: getScreenShot.getScreenShot(url, viewport, fullpage, (path) => {
//                     console.log('path: ', path);
//                     return path;
//                   })
//       },
//     };
//     console.log('resource url posted successfully');
//   });

