const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title : {type: String}, 
    subtitle: {type: String},
    category: {type: String},
    body: {type:String},
    author: {type: String},
    create_at: {type: Date, default: Date.now},
    comments: [{
        author: {type: String},
        time: {type: Date, default: Date.now},
        comment: {type: String}
    }]
});

const Article = module.exports =  mongoose.model('Article', articleSchema);

module.exports.getArticles = function(callback, limit){
    Article.find(callback).limit(limit).sort([['create_at', 'descending']])
}

module.exports.getArticleById = function(id, callback){
    Article.findById(id, callback);
}

module.exports.editArticle = function(query, update, {}, callback){
    Article.findOneAndUpdate(query, update, {}, callback);
}

module.exports.addArticle = function(article, callback){
    Article.create(article, callback);
}

module.exports.deleteArticle = function(id, callback){
    Article.findOneAndRemove(id, callback);
}