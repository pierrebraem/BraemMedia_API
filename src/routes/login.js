express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require('../models/user')

router.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(12)

    email = req.body.email
    password = req.body.password
    hash = await bcrypt.hash(password, salt)

    try{
        const login = await User.findOne({email: email})

        if(login != null){
            const result = await bcrypt.compare(password, login.password)

            if(result){
                return res.status(200).json({ message: "User authenticated" })
            }
        }
        return res.status(401).json({ message: "Email or password incorrect" })
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
})

module.exports = router