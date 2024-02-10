const User = require('../models/user')

async function getUser(req, res, next){
    try{
        const user = await User.findById(req.params.id)

        if(user == null){
            return res.status(404).json({ message: "User not found" })
        }

        res.user = user
        next()
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}

async function checkIfUserExist(req, res, next){
    try{
        const user = await User.find({ $or : [{ username: req.body.username}, { email: req.body.email}]})

        if(user.length > 0){
            return res.status(400).json({ message: "Username or email address already exist in the database" })
        }
        next()
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { getUser, checkIfUserExist }