const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const config = require('./myconfig');

//mongooes connect to database
console.log(`mongodb://${config.dbuser}:${config.dbpass}@ds125041.mlab.com:25041/sportblog`)
mongoose.connect(`mongodb://${config.dbuser}:${config.dbpass}@ds125041.mlab.com:25041/sportblog`);

//mongooes db start the connection
const db = mongoose.connection;


const app = express();

//set view engine
app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//use static path
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//express message
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//Adding router
const manage = require('./routes/manage');
const articles = require('./routes/articles');
const index = require('./routes/index');
const categories = require('./routes/categories');

//route
app.use('/', index);
app.use('/manage', manage);
app.use('/articles', articles);
app.use('/categories', categories);


//express validator
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        const namespace = param.split(".")
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        }
        return {
            param: formParam,
            msg : msg,
            value: value
        };
    }
}));




//app listen to port
app.listen(config.port , ()=> {
    console.log("listening to port: " + config.port);
});