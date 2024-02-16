express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/', async (req, res) => {
    email = req.body.email
    password = req.body.password

    try{
        const login = await User.findOne({email: email, password: password})

        console.log(login)
        if(login == null){
            res.status(401).json({ message: "Email or password incorrect" })
        }
        else{
            res.status(200).json({ message: "User authenticated" })
        }
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router