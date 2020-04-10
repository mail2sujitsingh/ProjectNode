const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const MongoClient = require('mongodb').MongoClient;

/*mongoose.connect('mongodb://localhost/projectvue')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);*/

const uri = "mongodb+srv://root:root@cluster0-yr2xy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices").findOne({}, function(error, result) {
    if (error) throw error;
	console.log(result);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
