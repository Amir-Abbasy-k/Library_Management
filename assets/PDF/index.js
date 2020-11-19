const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});


// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
app.use(cors());


// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err){
        return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
        //console.log(results);
        //res.send('Posts fetched...');  
    });
});


// Insert post 2
app.get('/getposts/add', (req, res) => {
	//const {title, body} = req.query;
    let post = {title:'Post Three', body:'This is post number two'};
    //let sql = `INSERT INTO posts (title, body) VALUES('${req.params.title}','${req.params.body}')`;
     let sql = 'INSERT INTO posts SET ?';
    db.query(sql,post, (err, result) => {
        if(err){
        	return res.send(err);
        } else{
        	return res.send('Successfully added');
        }
        //console.log(result);
        //res.send('Post 2 added...');
    });
});



app.get('/addpost_amir', (req, res) => {
    let post = {title:'Post Four', body:'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});


// Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {title:'Post four', body:'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});

app.listen('4000', () => {
    console.log('Server started on port 4000');
});
