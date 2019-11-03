const express   = require('express')
const Router    = express.Router()

// Import Controller
const albumsController      = require('../controller/albums')
const techStacksController  = require('../controller/techStacks')

// Router for albums
Router.get('/albums', albumsController.getAll)
Router.get('/albums/:id', albumsController.getByID)
Router.post('/albums/', [albumsController.midValidate, albumsController.midUpload], albumsController.insert)
Router.patch('/albums/:id', albumsController.midUpload, albumsController.patch)
Router.put('/albums/:id', [albumsController.midValidate, albumsController.midUpload], albumsController.insert)
Router.delete('/albums/:id', albumsController.delete)

// Router for techStacks
Router.get('/tech-stacks', techStacksController.getAll)
Router.get('/tech-stacks/:id', techStacksController.getByID)
Router.post('/tech-stacks/', techStacksController.midValidate, techStacksController.insert)
Router.patch('/tech-stacks/:id', techStacksController.patch)
Router.put('/tech-stacks/:id', techStacksController.midValidate, techStacksController.put)
Router.delete('/tech-stacks/:id', techStacksController.delete)

module.exports = Router