const express = require('express');
const router = express.Router();
Category = require('../models/category');
Article = require('../models/article');
const callbackError = require('../exception/callbackError');
const ImproperlyArgumentError = require('../exception/improperlyArgumentError');


router.get('/', (req, res, next)=> {
    res.send("Message Page");
});

router.get('/articles', (req, res, next)=> {
    Article.getArticles((error, articles)=> {
        if(error) throw new callbackError("Error get articles in manage", 417);
        console.log(articles)
        res.render('manage_articles', {
            title: "Manage Articles",
            articles : articles
        })
    })
      
})

router.get('/categories', (req, res, next)=> {
    Category.getCategories((error, categories)=>{
        if(error) throw new callbackError("Error with callback function while trying to get list of categories.", 417);
        // console.log(categories);
        res.render("manage_categories", {
            title: "Manage categories",
            categories: categories
        });
    });

    
})

router.get('/categories/add', (req, res, next)=>{
    res.render('add_category', {title: "Add category"})
})



router.get('/articles/add' , (req, res, next)=> {
    Category.getCategories((error, categories) => {
        if(error) throw new callbackError("Error in manage while retrieve categories", 417)
        res.render('add_article', {
            title: "Create Article",
            categories: categories
        });
    })


});

router.get('/articles/edit/:id', (req, res, next)=>{
    Article.getArticleById(req.params.id, (error, article)=>{
        if(error) throw new callbackError("Error in retrieve article");
        res.render("edit_article", {
            title: "Edit article",
            article: article
        });
    });
    res.render("edit_article", {title: "edit article"})
})

router.get('/categories/edit/:id', (req, res, next)=>{
    Category.getCategoryById(req.params.id, (error, category)=>{
        if(error) throw new ImproperlyArgumentError("Error invalid id for editting category", 417);
        res.render("edit_category", {
            title: "edit category",
            category: category
        });
    });
});

router.post('/categories/edit/:id', (req, res, next)=>{
    let query = {
        _id : req.params.id
    }
    let update = {
        title: req.body.title,
        description : req.body.description
    }
    Category.editCategory(query, update, {}, (error, category)=>{
        if(error) throw new ImproperlyArgumentError("Error while editting the category", 417);
        console.log(category);
        res.redirect('/manage/categories');
    })
});

router.delete('/categories/delete/:id', (req, res, next)=>{
    Category.deleteCategory(req.params.id, (error, response)=>{
        if(error) throw new ImproperlyArgumentError("Error can't delete the category", 417);
        console.log("Deleted the category");
        res.send(200);
    })
});

router.delete('/articles/delete/:id', (req, res, next)=>{
    Article.deleteArticle(req.params.id, (error, response)=>{
        if(error) {
            console.log(error)
            throw new callbackError("can't delete article");
        }
        res.send(200);
    })
})

module.exports = router;