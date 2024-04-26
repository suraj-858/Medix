const Costumer = require('../costumerModels/UserModel');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Editor = require('../costumerModels/EditorModel')

const emailVerifier = asyncHandler(async(req, res) =>{

    try {
        const {email} = req.body;
        if(!email) return res.status(400).json({message:"Email required"})

        const isExists = await Costumer.findOne({email}).exec();
        if(!isExists){
            return res.status(202).json({isExists: false, message:"Accepted"})
        }else{
            return res.status(208).json({isExists: true, message: "Already Registered"})
        }
        
    } catch (error) {
        res.status(500).json({error, message: "Internal Server Error"})
        
    }

})

const userRegister = asyncHandler(async(req, res ) =>{

    try {
        const {email, username, phone, password} = req.body;

        if(email && username  && phone && password){

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt)
            
            const userRoute = {
                username: username, 
                email: email, 
                password: hashedPassword,
                phoneNumber: phone
            }
            const user = new Costumer(userRoute);
            const response = await user.save();
            if(response){
                res.status(201).json({message:"Registered Successfully"});
            }

        }else{
            res.status(204).json({message: "No Content available"})
        }

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        
    }

})

const userUpdate = asyncHandler(async(req, res) =>{

    try {

        const {name, password } = req.body;
        const userId = req.params.id;

        if(name){
            await Costumer.findByIdAndUpdate(userId, {name: name})
            .then(response =>{
                res.status(200).json({response, message: "name successfully updated"})

            }).catch(error =>{
                res.status(401).json({error, message: "Error updating username"})
            })

        }
        if(password){

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            await Costumer.findByIdAndUpdate(userId, {password: hash})
            .then(response =>{
                res.status(200).json({response, message: "Password successfully updated"})

            }).catch(error =>{
                res.status(401).json({error, message: "Error updating Password"})
            })

        }
        
        
    } catch (error) {
        res.status(500).json({error, message:"Internal Server Error"})
        
    }

})


//Editor registration section
const editorRegister = asyncHandler(async(req, res) =>{

    try {
        const {email, password, companyName, address, Liscense, phoneNumber, } = req.body;

        if(email && password && companyName && address && phoneNumber && Liscense){
            
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const role = 1984;
            
            const editorDetails = {
                email: email, 
                password: hashedPassword, 
                roles: role,
                companyName: companyName, 
                address: address, 
                Liscense: Liscense, 
                phoneNumber: phoneNumber

            }
            const editor = new Editor(editorDetails);
            const response = await editor.save();
            
            if(response){
                res.status(201).json({message:`${companyName} is registered in medix`})
            }
        }else{
            res.status(204).json({message:"All fields are required"});
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error, message:"Internal Server Error"})
        
    }

})

//Delete editor profile

const removeEditor = asyncHandler(async(req, res) =>{

    try {
        const userId = req.params.id;
        await Editor.findByIdAndDelete(userId)
        .then(response =>{
            if(response){
                res.status(200).json({message:"Editor Deleted Successfully"})
            }
        }).catch(error =>{
            if(error){
                res.status(401).json({error, message: "Error deleting"})
            }
        })
        
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
        
    }
})

module.exports = {
    removeEditor, 
    emailVerifier, 
    userRegister, 
    userUpdate, 
    editorRegister
}