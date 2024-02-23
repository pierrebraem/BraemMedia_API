const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    try{
        res.status(200).json({ message: "Hello world!" })
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router