const express = require('express'),
 app = express(),
bodyparser = require('body-parser'),
uuid = require('uuid'); 
const morgan = require('morgan');

app.use(bodyparser.json());

fs = require('fs')
path = require('path')

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}));





let users = [
{
    id: '1',
    fullname : 'John Doe',
    email: 'john@email.com',
    favMovies: [{
    title:'Nobody',
    release:'2021 ',
    director: 'Ilya Naishuller',
    genre: 'action'
    }]
},
{
    id: '2',
    fullname: 'Jane Doe',
    emal: 'jane@email.com',
    favMovies: [{
    title:'Step Brothers',
    release:'2008',
    director: 'Adam McKay',
    genre: 'comedy'
    }]
},
];

let movies = [
{
    title:'Nobody',
    release:'2021 ',
    director: 'Ilya Naishuller',
    genre: 'action'
},
{
    title:'Step Brothers',
    release:'2008',
    director: 'Adam McKay',
    genre: 'comedy'
},
{
    title:'Hotel Transylvania',
    release:'2012', 
    director: 'Genndy Tartakovsky',
    genre: 'family'
},
{
    title:'Talladega Nights',
    release:'2006',
    director: ' Adam McKay',
    genre: 'comedy'
},
{
    title:'Rush Hour',
    release:'1998',
    director: ' Brett Ratner',
    genre: 'action'
},
{
    title:'Kung Fu Panda',
    release:'2008',
    director: ' Mark Osborne, John Stevenson', 
    genre: 'family'
},
{
    title:'Happy Gilmore',
    release:'1996',
    director: ' Dennis Dugan',
    genre: 'comedy'
},
{
    title:'Please Don\'t Destroy the Treasure of Foggy Mountain',
    release:'2023',
    director: ' Paul Briganti',
    genre: 'comedy'
},
{
    title:'Megamind',
    release:'2010',
    director: ' Tom McGrath',
    genre: 'family'
},
{
    title:'Dodgeball',
    release:'2004',
    director: 'Rawson Marshall Thurber',
    genre: 'comedy'
},
];

app.use(express.static('public'));
app.use(morgan('common'));


app.get('/', (req, res) => {
    res.send('welcome to My Movie app!');
});

app.get('/documentaion', (req, res) => {
    res.sendFile('public/documentaion.html', {
    root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(movies);
});


app.get('/movies', (req, res) => {
    res.status(200).json(movies)
});

app.get('/movies/:title', (req,res) => {
    const {title} = req.params;
    const movie = movies.find(movie => movie.title === title);
    if(movie){
        res.status(200).json(movie);
    }else{
        res.status(404).send('Movie not found');
    }
});
app.get('/movies/:genre', (req,res) => {
    const {genreName} = req.params;
    const genre = movies.find( movie => movie.genre === genreName);
    if (movie){
        res.status(200).json(genre);
    }else{
        res.status(404).send('genre not found');
    }
});
app.get('/movies/:directorName', (req, res) => {
    const{directorName}= req.params;
    const director = movies.find(movie => movie.director.Name === directorName)
    if (movie){
        res.status(200).json(movie.director);
    }else{
        res.status(404).send('movie not found');
    }
});


app.post ('/users', (req,res) => {
    const newUser = req.body;
    if(newUser.fullname){
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    }else{
        res.status(400).send('user needs a name');
    }
});
app.put('/users/:id', (req,res) => {
    const{id , title} = req.params;
    let user = user.find(user => user.id == id);
     let newTitle ={
        title, 
        director: req.body.director,
        genre: req.body.genre,
        release: req.body.release
     };
     if (user){
        user.favMovies.push(newTitle);
        res.status(200).send('user\'s favorite movies have been updated');
    }
    else{
        res.status(400).send('could not update favorite movies');
    }
    console.log(JSON.stringify(user.favMovies));
  });
  
  app.delete('/users/:id/:title', (req, res) => {
    const { id , title } = req.params;
    let user = users.find( user => user.id == id );
    if(user){
        user = user.favMovies.filter( m => m.title !== title)
        res.status(200).send('user\'s favorite movies have been updated');
      }
      else{
          res.status(400).send('could not update favorite movies');
      }
      console.log(JSON.stringify(user));
    });

    app.delete('/users/:id/', (req, res) => {
        const { id  } = req.params;
        let user = users.find( user => user.id == id );
        if(user){
            users = users.filter( user => user.id !== id)
            console.log(users);
            res.status(200).send('user has been deleted');
          }
          else{
              res.status(400).send('could not update user');
          }
        });
        app.post('/users/:id/:title', (req, res) => {
            const { id , title } = req.params;
            
            let user = users.find( user => user.id == id );
            let newTitle = {
              title,
              director: req.body.director,
              genre: req.body.genre
            };   
            if(user){
                user.favMovies.push(newTitle);
                res.status(200).send('user\'s favorite movies have been updated');
            }
            else{
                res.status(400).send('could not update favorite movies');
            } 
            console.log(JSON.stringify(user.favMovies));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
