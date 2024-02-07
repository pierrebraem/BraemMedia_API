const express = require('express')
const router = express.Router()
const User = require('../models/user')
const middleware = require('../middleware/user')

router.get('/:id', middleware.getUser, (req, res) => {
    res.send(res.user)
})

router.post('/', middleware.checkIfUserExist, async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        birthdate: req.body.birthdate,
        photo: req.body.photo
    })

    try{
        await user.save()
        res.status(201).json({ message: "User created successfully" })
    }
    catch(error){
        res.status(400).json({ message: error.message })
    }
})

router.patch('/:id', middleware.getUser, middleware.checkIfUserExist, async (req, res) => {
    if(req.body.firstname != null){
        res.user.firstname = req.body.firstname
    }

    if(req.body.lastname != null){
        res.user.lastname = req.body.lastname
    }

    if(req.body.username != null){
        res.user.username = req.body.username
    }

    if(req.body.email != null){
        res.user.email = req.body.email
        res.user.verified_email = false
    }

    if(req.body.birthdate != null){
        res.user.birthdate = req.body.birthdate
    }

    if(req.body.photo != null){
        res.user.photo = req.body.photo
    }

    res.user.updatedAt = new Date

    try{
        await res.user.save()
        res.json({ message: "User updated successfully" })
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', middleware.getUser, async (req, res) => {
    try{
        await res.user.deleteOne()
        res.json({ message: "User deleted successfully" })
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router