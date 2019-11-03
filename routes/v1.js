const express   = require('express')
const Router    = express.Router()

// Import Controller
const albumsController  = require('../controller/albums')

// Use Controller for routing
Router.get('/albums', albumsController.getAll)

Router.get('/albums/:id', albumsController.getByID)

Router.post('/albums/', [albumsController.midValidate, albumsController.midUpload], albumsController.insert)

Router.delete('/albums/:id', albumsController.delete)

Router.patch('/albums/:id', albumsController.midUpload, albumsController.patch)

module.exports = Router