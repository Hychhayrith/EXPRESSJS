var callbackError = function(message, code){
    this.message = message;
    this.code = code;
}

//prototype function doesn't take arrow function
callbackError.prototype.message = function(){
    return this.message;
}

callbackError.prototype.Errorcode = function(){
    return this.code;
}


module.exports = callbackError;