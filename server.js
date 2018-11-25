const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bluebird = require('bluebird');
// const MONGODB_URI = require('./config/key');

const PORT = process.env.PORT || 3001;
mongoose.Promise = bluebird;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}else{
    app.use(express.static(__dirname + '/client/public'));
}

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
});

const articleController = require('./server/controllers/article-controller')
const router = express.Router();

router.get('/api/saved', articleController.find);
router.post('/api/saved', articleController.insert);
router.delete('/api/saved/:id', articleController.delete); 
router.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});