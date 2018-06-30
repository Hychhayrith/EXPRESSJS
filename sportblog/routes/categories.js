const express = require('express');
const router = express.Router();
Category = require('../models/category.js');
const callbackError = require('../exception/callbackError');


router.get('/', (req, res, next)=> {
    Category.getCategories((error, categories)=>{
        if(error) throw new callbackError("Error with the callback function while trying to get category.", 417);
        // console.log(categories);
        res.render('categories', {
            title: "Categories",
            categories: categories
        });
    });
});

router.post('/add', (req, res, next) => {
    const category = new Category();
    category.title = req.body.title;
    category.description = req.body.description;

    Category.addCategories(category, (error, response)=>{
        if(error) throw new callbackError("Error with callback function while trying to add category.", 417);
        console.log(response);
        res.redirect('/manage/categories');
    })
});



router.get('/show/:id', (req, res, next)=>{
    const id = req.params.id;
    Category.getCategoryById(id, (error, category)=>{
        if(error) throw new callbackError("Error while retrieving category",  417);
        console.log("category: " + category)
        res.render('category', {
            title: category.title,
            category: category
        })
    })
})


module.exports = router;