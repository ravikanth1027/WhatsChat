const mongoose = require('mongoose');
/*const faker = require('faker')*/
var Schema = mongoose.Schema;

const messageSchema= new Schema({
    id : {
        type:String
    },
    msg : {
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
    }
});

module.exports = mongoose.model('message', messageSchema);