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

module.exports = { getReview }