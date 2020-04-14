const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const users = require('./routes/users');
const Schema = mongoose.Schema;

/*mongoose.connect('mongodb://localhost/projectvue')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);*/

mongoose.connect('mongodb+srv://root:root@cluster0-yr2xy.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

// create a schema
var attendeesSchema = new Schema({
       text: String,
       value: Number,
       color: String
});

// the schema is useless so far
// we need to create a model using it
var Attendees = mongoose.model('attendees', attendeesSchema);

var attendeesObj = new Attendees({"text":"Ayush","value":1,"color":"#ef701d"},{"text":"Bhoodeo","value":2,"color":"#5fb1f7"},{"text":"Sujit","value":3,"color":"#5fb1f7"},{"text":"Danish","value":4,"color":"#35a964"},{"text":"Sunakshi","value":5,"color":"#35a964"},{"text":"Srashti","value":6,"color":"#35a964"},{"text":"Rajesh","value":7,"color":"#35a964"},{"text":"Arjun","value":8,"color":"#35a964"});

// call the built-in save method to save to the database
// attendeesObj.save(function(err) {
//   if (err) throw err;
//
//   console.log('Attendees saved successfully!');
// });

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.get('/', (request, response) => {
  Attendees.find({}, function(err, data) {
    if (err) throw err;
    console.log('Attendees Data: ', data);
    response.send(data);
  });

});

app.get('/userlist/:id/:name', (request, response) => {
  response.send(`You are requesting for id: ${request.params.id} and name: ${request.params.name}.`);
});

app.get('/attendees', (request, response) => {
  console.log('API called');
  Attendees.find({}, function(err, data) {
    if (err) throw err;
    console.log('Attendees Data: ', data);
    response.send(data);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
