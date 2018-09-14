// will take express app
// this app is going to be a listener for 
// incoming requests
// lika request listner
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/test_meanstackdB';

const userRoutes = require("./routes/user");

mongoose.connect(mongoDB).then(()=>{
    console.log('connection to DB success');
}). catch(()=> {
    console.log('connection to DB failed');
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

app.use(bodyParser.json());
// next function to allow request to continue its journey to next router.whatever
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", 
        "origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTION"
    );
    next();
});


app.use('/api/posts', postsRoutes);
app.use("/api/user", userRoutes);
module.exports = app;
