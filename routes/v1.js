const express   = require('express')
const Router    = express.Router()

// Import Controller
const albumsController  = require('../controller/albums')

// Use Controller for routing
Router.get('/albums', albumsController.getAll)
Router.get('/albums/:id', albumsController.getByID)

module.exports = Router