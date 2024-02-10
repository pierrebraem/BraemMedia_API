const express = require('express')
const router = express.Router()
const Media = require('../models/media')
const middleware = require('../middleware/media')

router.get('/:id', middleware.getMedia, (req, res) => {
    res.send(res.media)
})

router.post('/', async (req, res) => {
    const media = new Media({
        name: req.body.name,
        released: req.body.released,
        type: req.body.type,
        description: req.body.description,
        poster: req.body.poster,
        runtime: req.body.runtime,
        dvd_released: req.body.dvd_released
    })

    try{
        await media.save()
        res.status(201).json({ message: "media created successfully" })
    }
    catch(error){
        res.status(400).json({ message: error.message })
    }
})

router.patch('/:id', middleware.getMedia, async (req, res) => {
    if(req.body.name != null){
        res.media.name = req.body.name
    }

    if(req.body.released != null){
        res.media.released = req.body.released
    }

    if(req.body.type != null){
        res.media.type = req.body.type
    }

    if(req.body.description != null){
        res.media.description = req.body.description
    }

    if(req.body.poster != null){
        res.media.poster = req.body.poster
    }

    if(req.body.runtime != null){
        res.media.runtime = req.body.runtime
    }

    if(req.body.dvd_released != null){
        res.media.dvd_released = req.body.dvd_released
    }

    res.media.updatedAt = new Date

    try{
        await res.media.save()
        res.json({ message: "Media updated successfully" })
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', middleware.getMedia, async (req, res) => {
    try{
        await res.media.deleteOne()
        res.json({ message: "Media deleted successfully" })
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router