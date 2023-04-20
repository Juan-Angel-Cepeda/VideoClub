const mongoose = require('mongoose');

const schema = mongoose.schema({
    _member:{
        type:mongoose.Schema.ObjectId,
        ref:'Member'
    },
    _movie:{
        type:mongoose.Schema.ObjectId,
        ref:'Movie'
    }
})

class AwaitList{
    constructor(member,movie){
        this._member = member,
        this._movie = movie;
    }
    set member(value){
        this._member = value
    }
    get member(){
        return this._member;
    }
    set movie(value){
        this._movie = value;
    }
    get movie(){
        return this._movie;
    }
}

schema.loadClass(AwaitList);
module.exports = mongoose.model('AwaitList',schema)