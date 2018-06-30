const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const callbackError = require('../exception/callbackError');

router.get('/', (req, res, next) => {
    Article.getArticles((error, articles) => {
        if(error) throw new callbackError("Error retrieve articles", 417);
        res.render("articles", {
            title: "Articles",
            articles: articles
        });
    })
    
});

router.get('/show/:id', (req, res, next)=>{
    res.render('article', {title : "Article"});
});

router.post('/add', (req, res, next)=> {
    const article = new Article();
    article.title = req.body.title;
    article.subtitle = req.body.subtitle;
    article.category = req.body.category;
    article.author = req.body.author;
    article.body = req.body.body;

    Article.addArticle(article, (error, response)=>{
        if(error) throw new callbackError("Can't add article", 417);
        console.log(response);
        res.redirect('/manage/articles');
    })
})

router.get('/category/:category_id', (req, res, next)=> {
    res.render('articles', {title: "Category Articles"})
})

module.exports = router;