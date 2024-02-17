const express = require('express')
const router = express.Router()

const Review = require('../models/review')

const { getReview } = require('../middlewares/review')
const { getMedia } = require('../middlewares/media')
const { getUser } = require('../middlewares/user')

// Obtenir un avis par son id
router.get('/:id', getReview, (req, res) => {
    res.send(res.review)
})

// Obtenir une liste d'avis sur un média
router.get('/media/:id', getMedia, async (req, res) => {
    try{
        const reviews = await Review.find({ idmedia: req.params.id })

        res.send(reviews)
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }    
})

// Obtenir une liste d'avis sur un utilisateur
router.get('/user/:id', getUser, async (req, res) => {
    try{
        const reviews = await Review.find({ iduser: req.params.id })

        res.send(reviews)
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }    
})

router.post('/', async (req, res) => {
    const review = new Review({
        iduser: req.body.iduser,
        idmedia: req.body.idmedia,
        rated: req.body.rated,
        comment: req.body.comment
    })

    try{
        await review.save()
        res.status(201).json({ message: "review created succefully" })
    }
    catch(error){
        res.status(400).json({ message: error.message })
    }
})

router.patch('/:id', getReview, async (req, res) => {
    if(req.body.rated != null){
        res.review.rated = req.body.rated
    }

    if(req.body.comment != null){
        res.review.comment = req.body.comment
    }

    res.review.updatedAt = new Date

    try{
        await res.review.save()
        res.json({ message: "Review updated successfully" })
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', getReview, async (req, res) => {
    try{
        await res.review.deleteOne()
        res.json({ message: "Review deleted successfully" })
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router