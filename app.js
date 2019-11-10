const express       = require('express')

const config        = require('./config')
const middleware    = require('./middleware')
const routes        = require('./routes')

const port          = process.env.PORT || config.app.port

const app = express()

app.use(middleware.cors())
app.use(middleware.bodyParser.json())
app.use(middleware.fileParser())
app.use(middleware.db)
app.use(middleware.reqIn)

// Expose public folder
app.use('/public', express.static('public'))

// API Routing
app.use('/v1', routes.v1)

app.use(middleware.notFound)

app.listen(port, function(){
    console.log('App running on port : ', port)
})