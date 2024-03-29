const mongoose = require('mongoose');
/*const faker = require('faker')*/
var Schema = mongoose.Schema;

const messageSchema= new Schema({
    id : {
        type:String
    },
    text : {
        type:String,
        required: [true, 'from is required']
    },
    to: {
        type:String,
        required: [true, 'to is required']
    },
    from:{
        type:String,
        required: [true, 'from is required']
    },
    date:{
        type:Date,
        default:Date.now()
    },
    read : {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('message', messageSchema);