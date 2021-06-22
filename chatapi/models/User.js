const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema= new Schema({
    username:{
        type:String,
        required: [true, 'from is required']
    },
    email :{
        type:String,
        unique : true,
        required: [true, 'from is required']
    },
    phonenumber:{
        type: String,
        unique: true,
        required: [true, 'number is required']
    },
    password:{
        type:String,
        required: [true, 'from is required']
    },
    company:{
      type:String,
      required: [true, 'from is required']  
    },
    contacts:{
        type : Array ,
        "default" : []
    }
});

module.exports = mongoose.model('User', UserSchema);