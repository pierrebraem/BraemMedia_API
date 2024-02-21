const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    released: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true,
        validate: { validator: type => type == "Movie" || type == "Serie" || type == "Game", message: "Type must be either Movie, Serie or Game" }
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    sorts: {
        type: [String],
        required: true,
        validate: { validator: sorts => sorts.length > 0, message: "sorts is empty" }
    },
    poster: {
        type: String,
        default: null
    },
    /* Informations pour les films uniquement */
    runtime: {
        type: Number,
        default: null
    },
    dvd_released: {
        type: Date,
        default: null
    },
    /* Informations pour les séries uniquement */
    saisons: {
        type: [{
            nb_saison: {
                type: Number,
                required: true
            },
            episodes: [{
                name: {
                    type: String,
                    required: true
                },
                nb_episode: {
                    type: Number,
                    required: true
                },
                released: {
                    type: Date,
                    required: true
                },
                runtime: {
                    type: Number,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                _id: false
            }]
        }],
        default: null,
        _id: false
    },
    /* Informations sur les jeux-vidéo uniquement */
    platforms: {
        type: [String],
        default: null
    },
    /* Informations mise à jour */
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Media', mediaSchema)