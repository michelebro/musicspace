const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Song = require('./models/songs.js');
const methodOverride = require('method-override');

require('dotenv').config();
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
    Song.deleteMany({}, (err, results) => {
        Song.create(data, (err, Songs) => {
            res.redirect('/musicspace');
        });
    });  
});

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//INDEX
app.get('/musicspace', (req, res) => {
    Song.find({}, (err, allSongs) => {
        res.render('index.ejs', {
            songs : allSongs
        });
    });
});

//NEW
app.get('/musicspace/new',(req, res) => {
    res.render('new.ejs');
});

//DELETE
app.delete('/musicspace/:id', (req, res) => {
    Song.findByIdAndDelete(req.params.id, (err, deletedSong) => {
        res.redirect('/musicspace');
    });
});
//UPDATE
app.put('/musicspace/:id/', (req, res) => {
    if(req.body.completed === 'on') {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }
    Song.findByIdAndUpdate(req.params.id, req.body, (err, Songs) => {
        res.redirect('/musicspace');
    });
});

//CREATE
app.post('/musicspace', (req, res) => {
    if(req.body.completed === "on") {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }

    Song.create(req.body, (err, createdSong) => {
        res.redirect('/musicspace'); // redirect to the books index page
    });
});

//EDIT
app.get('/musicspace/:id/edit', (req, res) => {
    Song.findById(req.params.id, (err, foundSong) => {
        res.render('edit.ejs', {
            songs : foundSong
        });
    });
});

//SHOW
app.get('/musicspace/:id', (req, res) => {
    Song.findById(req.params.id, (err, foundSong) => {
        res.render('show.ejs', {
            songs : foundSong
        });
    });
});

//Rate
app.post('/musicspace/:id/ratings', (req, res) => {
    Song.findById(req.params.id, (err, song) => {
        song.ratings.push(req.body);
        song.save((err) => {
            res.redirect('/musicspace/' + song._id);
        });
    });
});


//LISTEN
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});