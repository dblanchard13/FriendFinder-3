var friendsData  = require('../data/friends.js');

// you aren't actually using the path module in this file so there's no need to require it
// var path = require('path');

module.exports = function(app){

app.get('/api/friends', function(req, res){
      res.json(friendsData);
    });

app.post('/api/friends', function(req, res){

var closestMatch = 0;
var maxDiff = 1000;

// since friendsData is an array you could just use the native `.forEach` method here
// this creates a functional closure/scope that won't leak variables.
for (var i = friendsData.length - 1; i >= 0; i--) {

var totalDifference = 0;

// you could also use forEach here
for (var j = 0; j < 2; j++ ){

  totalDifference = totalDifference + Math.abs(friendsData[i].scores[j] - req.body.scores[j]);

        }

        if (totalDifference < maxDiff){
          // maxDiff is a pretty confising variable name since it's really the minimum difference that you're keeping track of
          maxDiff = totalDifference;
          closestMatch = i;
        }

        console.log("total difference for " + friendsData[i].name + " is " + totalDifference);

      }


          friendsData.push(req.body);


          res.json({name: friendsData[closestMatch].name, photo: friendsData[closestMatch].photo});

        });

      }
