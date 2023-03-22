const mongoose = require('mongoose');

//Schema
const schema = mongoose.Schema({
    _name:String,
    _lastName:String
});


//Classe
class Director {

    constructor(name,lastName){
        this._name = name;
        this._lastName = lastName;
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


schema.loadClass(Director);
module.exports = mongoose.model('Director',schema);