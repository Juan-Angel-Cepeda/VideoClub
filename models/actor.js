const mongoose = require('mongoose');

//Schema
const schema = mongoose.Schema({
    __name:String,
    __lastName:String
})

class Actor{
    constructor(name,lastName){
        this.__name = name;
        this.__lastName = lastName
    }

    get name(){
        return this._name;
    }
    
    set name(value){
        this._name = value;
    }

    get lastName(){
        return this._lastName;
    }
    
    set lastName(value){
        this._lastName = value;
    }

};

schema.loadClass(Actor);
module.exports = mongoose.model('Actor',schema);