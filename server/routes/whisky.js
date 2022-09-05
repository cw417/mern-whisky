const express = require('express');
const whiskyRoutes = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
 
// Get a list of all the whiskies.
whiskyRoutes.route('/whisky').get(function (req, res) {
 let db_connect = dbo.getDb('employees');
 db_connect
   .collection('whiskies')
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// Get a single whisky by id
whiskyRoutes.route('/whisky/:id').get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection('whiskies')
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// Create a new whisky.
whiskyRoutes.route('/whisky/add').post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection('whiskies').insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// Update a whisky by id.
whiskyRoutes.route('/update/:id').post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection('whiskies')
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log('1 document updated');
     response.json(res);
   });
});
 
// Delete a whisky
whiskyRoutes.route('/:id').delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection('whiskies').deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log('1 document deleted');
   response.json(obj);
 });
});
 
module.exports = whiskyRoutes;