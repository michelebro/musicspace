const express = require('express');
const PORT = 3000;
const app = express();
const Musicspace = require('./models/musicspace.js');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//INDEX
app.get('/musicspace/', (req, res) => {
    res.render('index.ejs', {
        allSongs : Songs
    });
});

//NEW
app.get('/musicspace/new',(req, res) => {
    res.render('new.ejs');
});

//DELETE
app.delete('/musicspace/:index', (req,res) => {
    Musicspace.splice(req.params.index, 1);
    res.redirect('/musicspace');
});

//UPDATE
app.put('/musicspace/:index/', (req, res) => {
    Musicspace[req.params.index] = req.body;
    res.redirect('/musicspace');
});

//CREATE
app.get('/musicspace/', (req, res) => {
    Musicspace.push(req.body);
    res.redirect('/musicspace');
});

//EDIT
app.get('/musicspace/:index/edit', (req, res) => {
    res.render('edit.ejs', { allSongs : Songs[req.params.index], index: req.params.index});
});

//SHOW
app.get('/musicspace/:index', (req, res) => {
    res.render('show.ejs', { Musicspace : Musicspace[req.params.index]});
});

//LISTEN
app.listen(PORT, () => {
    console.lof(`Server is listening on ${PORT}`);
});