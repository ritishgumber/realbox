   var express = require('express');
   var app = express();
   var bodyParser = require('body-parser')
   app.use(bodyParser.json()); // to support JSON-encoded bodies
   app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
       extended: true
   }));

   //Mongoose
   var mongoose = require('mongoose');
   mongoose.Promise = global.Promise;
   mongoose.connect('mongodb://localhost/test');


   app.get('/status', function (req, res) {
       res.send({
           status: 200, 
           message: 'Cool!'
       })
   })

   require('./routes')(app);

   app.listen(3000, function () {
       console.log("Listening on port 3000");
   })