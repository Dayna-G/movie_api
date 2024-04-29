const express = require('express');
morgan = require('morgan');
fs = require('fs')
path = require('path')
const app = express();

let topMovies = [
{
    title:'Nobody',
    release:'2021 '
},
{
    title:'Step Brothers',
    release:'2008'
},
{
    title:'Hotel Transylvania',
    release:'2012'
},
{
    title:'Talladega Nights',
    release:'2006'
},
{
    title:'Rush Hour',
    release:'1998'
},
{
    title:'Kung Fu Panda',
    release:'2008'
},
{
    title:'Happy Gilmore',
    release:'1996'
},
{
    title:'Please Don\'t Destroy the Treasure of Foggy Mountain',
    release:'2023'
},
{
    title:'Megamind',
    release:'2010'
},
{
    title:'Dodgeball',
    release:'2004'
},
];

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('welcome to MyMovie app!');
});

app.get('/documentaion', (req, res) => {
    res.sendFile('public/documentaion.html', {
    root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/secreturl', (req, res) => {
res.send('This is a secret url with super top-secret content.');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});