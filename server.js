const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Songs = require('./models/songs.js');
//const methodOverride = require('method-override');

require('dotenv').config(); // looks for a .env file and makes it's vars available to process.env
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;


mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.log('An error occurred with MongoDB: ' + err.message);
});

const data = require('./data');

app.get('/musicspace/seed', (req, res) => {
    Songs.deleteMany({}, (err, results) => {
        Songs.create(data, (err, Songs) => {
            res.redirect('/musicspace');
        });
    });
});

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
//app.use(methodOverride('_method'));

//INDEX
app.get('/musicspace/', (req, res) => {
    res.render('index.ejs', {
        Songs : Songs
    });
});

//NEW
app.get('/musicspace/new',(req, res) => {
    res.render('new.ejs');
});

//DELETE
app.delete('/musicspace/:index', (req,res) => {
    MusicSpace.splice(req.params.index, 1);
    res.redirect('/musicspace');
});

//UPDATE
app.put('/musicspace/:index/', (req, res) => {
    MusicSpace[req.params.index] = req.body;
    res.redirect('/musicspace');
});

//CREATE
app.get('/musicspace/', (req, res) => {
    MusicSpace.push(req.body);
    res.redirect('/musicspace');
});

//EDIT
app.get('/musicspace/:index/edit', (req, res) => {
    res.render('edit.ejs', { Songs : Songs[req.params.index], index: req.params.index});
});

//SHOW
app.get('/musicspace/:index', (req, res) => {
    res.render('show.ejs', { Songs : Songs[req.params.index]});
});

//LISTEN
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});