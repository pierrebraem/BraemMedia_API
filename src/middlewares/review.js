const Review = require('../models/review')

async function getReview(req, res, next){
    try{
        const review = await Review.findById(req.params.id)

        if(review == null){
            return res.status(404).json({ message: "Review not found" })
        }

        res.review = review
        next()
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}

async function checkIfReviewExist(req, res, next){
    try{
        const review = await Review.findOne({ iduser: req.body.iduser, idmedia: req.body.idmedia })

        console.log(review)

        if(review != null){
            return res.status(400).json({ message: "Review already exists with this user" })
        }
        next()
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { getReview, checkIfReviewExist }