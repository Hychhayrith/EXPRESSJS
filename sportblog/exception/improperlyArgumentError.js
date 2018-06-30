var ImproperlyArgumentError = function(message, code){
    this.message = message;
    this.code = code;
}

ImproperlyArgumentError.prototype.message = function(){
    return this.message;
}

ImproperlyArgumentError.prototype.code = function(){
    return this.code;
}






module.exports = ImproperlyArgumentError;