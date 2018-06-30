const mongoose = require('mongoose');
const ImproperlyArgumentError = require('../exception/improperlyArgumentError');

//define category schema
const categorySchema = mongoose.Schema({
    title: {type: String},
    description: {type: String}
})


//export the schema and define the model of category schema
const Category = module.exports = mongoose.model('Category', categorySchema);


//Get category function by using find()
module.exports.getCategories = function(callback, limit){
    Category.find(callback).limit(limit).sort([['title', 'ascending']]);
}


//Set category function by using create()
module.exports.addCategories = function(category, callback){
    Category.create(category, callback);
}

//find category by id
module.exports.getCategoryById = function(id, callback){
    Category.findById(id, callback);
}

//Edit category function by using findOneAndUpdate
module.exports.editCategory = function(id=null, title=null, options, callback){
    if(id==null || title == null){
        throw new ImproperlyArgumentError("Error invalid id or title.", 417);
    } 
    Category.findOneAndUpdate(id, title, options, callback);
}

//Remove category by using findByIdAndremove
module.exports.deleteCategory = function(id=null, callback){
    if(id == null) throw new ImproperlyArgumentError("Error invalid id to delete category.", 417);
    Category.findByIdAndRemove(id, callback);
}
  