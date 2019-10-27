const express       = require('express')

const config        = require('./config')
const middleWare    = require('./middleware')
const routes        = require('./routes')

const port          = process.env.port || config.app.port

const app = express()

app.use(middleware.cors())
app.use(middleware.bodyParser.json())

app.use('/v1', routes.v1)

app.use(middleWare.notFound)

app.listen(port, function(){
    console.log('App running on port : ', port)
})