const mongoose = require('mongoose');
//Shema
const schema = mongoose.Schema({
    _date:Date,
    _member:{
        type:mongoose.Schema.ObjectId,
        ref:'Member'
    },
    _copy:{
        type:mongoose.Schema.ObjectId,
        ref:'Copy'
    }
})
class Booking{
    constructor(
        member,
        copy
    ){
        this._member = member;
        this._copy = copy;
    }
    get member(){
        return this._member;
    }
    set member(value){
        this._member = value;
    }
    get copy(){
        return this._copy;
    }
    set copy(value){
        this._copy = value;
    }
}
schema.loadClass(Booking);
module.exports = mongoose.model('Booking',schema)