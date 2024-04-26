const mongooose = require('mongoose')

const userModel = new mongooose.Schema({
    
    username:{
        type: String,
        required: true

    }, 
    email:{
        type: String, 
        required: true

    }, 
    password:{
        type: String, 
        required: true

    }, 
    phoneNumber:{
        type: Number

    },
    roles:{
        type: Number, 
        required: true, 
        default: 2001
    },
    Date:{
        type: Date, 
        default: Date.now()
    }


})


module.exports = mongooose.model('costumer', userModel)