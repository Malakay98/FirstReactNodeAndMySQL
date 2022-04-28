const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

// Change the params for your personal mysql database connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movies'
})

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Get the movies in the db
app.get('/api/getMovies', (req, res) => {
    const sqlSelect = "SELECT * FROM moviestable";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
})

// Create a movie
app.post('/api/movie', (req, res) => {

    const movieName = req.body.title;
    const movieContent = req.body.content;

    const sqlInsert = "INSERT INTO moviestable (title, content) VALUES (?, ?)"
    db.query(sqlInsert, [movieName, movieContent], (err, result) => {
        console.log(result)
    })
});

// Delete a movie
app.delete('/api/deleteMovie/:title', (req, res) => {
    const movieName = req.params.title;

    const sqlDelete = "DELETE FROM moviestable WHERE title = ?";
    db.query(sqlDelete, movieName, (err, result) => {
        if (err) console.log(err);
    })
})

// Udpate the movie
app.put('/api/updateMovie', (req, res) => {
    const movieName = req.body.title;
    const movieReview = req.body.content;

    const sqlUpdate = "UPDATE moviestable SET content = ? WHERE title = ?";
    db.query(sqlUpdate, [movieReview, movieName], (err, result) => {
        if (err) console.log(err);
    })
})

app.listen(3001, () => {
    console.log("Server running on port 3001")
});

