const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _description:String
})

//clase
class Genre{
    constructor(description){
        this._description = description
    }
    get description(){
        return this._description;
    }
    set description(value){
        this._description = value;
    }
}

schema.loadClass(Genre);
module.exports = mongoose.model('Genre',schema);