const express   = require('express')
const Router    = express.Router()

// Import Controller
const albumsController  = require('../controller/albums')

Router.get('/albums', albumsController.getAll)

module.exports = Router