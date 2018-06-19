const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//creating app 
const app = express();
const port = 3501;

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/todoapp';

//setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//setup view engine by using ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

MongoClient.connect(url, (err, database) => {
    if(err){
        console.log(err);
    } 
    console.log("MongoDB connected");
    
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

app.post('/todo/add', (req, res, next) => {
    const content = {
        text: req.body.text,
        body: req.body.body
    }
    Todos.insert(content, (err, result) => {
        if(err) console.log(err);
        console.log("Todo added");
    });
    res.redirect('/');
});

app.delete('/todo/delete/:id', (req, res, next)=>{
    const query = {
        _id : ObjectID(req.params.id)
    };

    Todos.deleteOne(query, (err, response)=>{
        if(err) console.log(err);
        console.log("Todo removed");
        res.send({status: 200});
    })
});


app.get('/todo/edit/:id', (req, res, next)=>{
    const query = ObjectID(req.params.id);
    Todos.find(query).next((err, todo)=>{
        if(err) console.log(err);
        res.render('edit', {
            todo: todo
        });
        console.log("passed todo")
    })
});

app.post('/todo/edit/:id', (req, res, next)=> {
    const query = {
        _id : ObjectID(req.params.id)
    };
    const content = {
        text : req.body.text,
        body : req.body.body
    }
    Todos.updateOne(query, {$set:content}, (err, result)=>{
        if(err) console.log(err);
        res.redirect('/');
        console.log("Todo Edited");
    });
    
});