const express = require('express')
const router = express.Router()
const Media = require('../models/media')

router.get('/', async (req, res) => {
    const query = req.query.query
    const type = req.query.type
    let medias

    try{
        if(query == null){
            return res.status(400).json({ message: "Query is null" })
        }

        if(query.length < 3){
            return res.status(400).json({ message: "Query must be at least 3 caracters"})
        }

        if(type != null && type != ""){
            medias = await Media.find({name: {$regex: query, $options: 'i'}, type: type})
        }
        else{
            medias = await Media.find({name: {$regex: query, $options: 'i'}})
        }

        res.send(medias)
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router