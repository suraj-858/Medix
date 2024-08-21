const mongoose = require('mongoose');

const editorSchema = new mongoose.Schema({

    email:{
        type: String, 
        required: true
    }, 
    username:{
        type: String, 
        required: true
    },
    password:{
        type: String, 
        required: true, 
    },
    roles:{
        type: Number, 
        required: true
    }, 
    companyName:{
        type: String, 
        required: true, 
    }, 
    address:{
        type: String, 
        required: true
    }, 
    Liscense:{
        type: String, 
        required: true
    }, 
    phoneNumber:{
        type: String, 
        required: true
    }, 
    Date:{
        type: Date, 
        default: Date.now()
    }

})

module.exports = mongoose.model("Editor", editorSchema)