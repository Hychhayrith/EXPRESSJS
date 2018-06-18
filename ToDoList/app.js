const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//creating app 
const app = express();
const port = 3001;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/todoapp';

//setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//setup view engine by using ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

MongoClient.connect(url, (err, database) => {
    if(err) console.log(err);
    else console.log("MongoDB connected");
    
    db = database;
    Todos = db.collection('todos');

    app.listen((process.env.PORT || port), ()=> {
        console.log("Running on port : " + port);
    })
});

app.get('/', (req, res) => {
    Todos.find({}).toArray((err, todos)=> {
        if(err) return console.log(err);
        res.render('index', {
            todos: todos
        });
    });
});