const Costumer = require('../costumerModels/UserModel');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const registerAdmin  = asyncHandler(async(req, res) =>{
    try {
        const rolesToSearch = [5150, 5151];

        const response = await Costumer.find({roles: {$all: rolesToSearch}})
        if(response?.length < 2){
            const {username, password, email} = req.body;
            if(username && password && email){

                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password, salt);

                const adminDetails = {
                    username: username,
                    password: hashedPassword, 
                    roles: 5150,
                    email: email
                }
                const admin = new Costumer(adminDetails);
                const response = await admin.save();
                 
                if(response){
                    res.status(201).json({message:"Admin Added to the board"})
                }
            }else{
                res.status(204).json({message:"All Fields Required"})
            }

        }else{
            res.status(403).json({message:"Cannot create more than 2 admins"})
        }
    } catch (error) {
        res.status(500).json({error , message: "Internal Server Error"})
        
    }

})

const removeAdmin = asyncHandler(async(req, res) =>{

    try {
        const response = await Costumer.find({roles: 5151})
        if(response.length > 0 ){
            
            await Costumer.findOneAndDelete({roles: 5151})
            .then(response =>{
                res.status(200).json({response, message:"Co-Admin Removed"})
            }).catch(error =>{
                res.status(403).json({error, message: "Error Deleting Co-Admin"})
            })

        }else{
            res.status(400).send("No Co-Admin to remove")
        }
        
    } catch (error) {
        res.status(500).json({error, message:"Internal Server Error"})
        
    }

})

module.exports = {
    registerAdmin, 
    removeAdmin
}