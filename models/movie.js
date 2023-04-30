const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _title: String,
    _director: {
        type:mongoose.Schema.ObjectId,
        ref:'Director'
    },
    _genre:{
        type:mongoose.Schema.ObjectId,
        ref:'Genre'
    },
    _cast:[{
        type:mongoose.Schema.ObjectId,
        ref:'Actors'
    }]
});

class Movie{
    constructor(title,director,cast){
        this._title = title;
        this._director = director;
        this._cast = cast
    }
    get title(){
        return this._title;
    }
    set title(value){
        this._title = value;
    }

    get director(){
        return this._director;
    }
    set director(value){
        this._director = value;
    }
    get cast(){
        return this._cast
    }
    set cast(value){
        this._cast = value;
    }
}

schema.loadClass(Movie);
module.exports = mongoose.model('Movie',schema);