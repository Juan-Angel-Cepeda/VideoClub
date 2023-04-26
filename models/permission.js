const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _description: String,
    _type: String
})

class Permission{
    constructor(description, type){
        this._description = description;
        this._type = type;
    }

    get description(){
        return this._description;
    }

    set description(v){
        this._description = v;
    }

    get type(){
        return this._type;
    }

    set type(v){
        this._type = v;
    }
}

schema.loadClass(Permission);
module.exports = mongoose.model('Permission', schema);