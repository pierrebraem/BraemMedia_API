const Media = require('../models/media')

async function getMedia(req, res, next){
    try{
        const media = await Media.findById(req.params.id)

        if(media == null){
            return res.status(404).json({ message: "Media not found" })
        }

        res.media = media
        next()
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { getMedia }