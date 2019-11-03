const shortid = require('shortid')

let albums = {}

// GET ALL albums data
albums.getAll = (req, res)=>{
    const result = req.db.get('albums').value()
    
    console.log('Result : ', JSON.stringify(result))
    res.send(result)
}

// GET albums data BY ID
albums.getByID = (req, res)=>{
    const result = req.db
        .get('albums')
        .find({ id : req.params.id })
        .value()
    
    console.log('Result : ', JSON.stringify(result))
    
    if(result){
        res.send(result)
    } else {
        res.status(404).send('<pre> 404 Not Found! </pre>')
    }
}

// Insert data to db
albums.insert = (req, res)=>{
    const data = {
        id      : shortid.generate(),
        title   : req.body.title,
        artist  : req.body.artist, 
        url     : req.body.url,
        image   : req.body.image
    }

    const result = req.db.get('albums').push(data).write()
    if(result){
        console.log('Result : ', JSON.stringify(data))
        res.send(data)
    } else {
        res.status(500).send('<pre> 500 Error </pre>')
    }
}

// Validation : data should contain title, artist, url, & image
albums.midValidate = (req, res, next)=>{
    let { title, artist, url } = req.body
    if( !title || !artist || !url ){
        res.status(400).send('<pre> 400 Bad Request! </pre>')
    } else {
        next()
    }
}

// Upload image
albums.midUpload = (req, res, next)=>{
    if(req.files && req.files.image){
        let photo       = req.files.image
        let photoName   = photo.name
        
        photo.mv('./public/' + photoName, (err)=>{
            if(err){
                console.log('ERROR Cannot upload file!')
            } else {
                req.body.image = '/public/' + photoName
            }
            next()
        })
    } else {
        next()
    }
}

// Delete data
albums.delete = (req, res)=>{
    const result = req.db.get('albums').remove({ id : req.params.id }).write()

    if(result){
        console.log('Result : ', JSON.stringify(result[0]))
        res.send(result[0])
    } else {
        res.status(500).send('<pre> 500 Error </pre>')
    }
}

// Patch data
albums.patch = (req, res)=>{
    const data = {}
    if( req.body.title  ) data.title    = req.body.title
    if( req.body.artist ) data.artist   = req.body.artist
    if( req.body.url    ) data.url      = req.body.url
    if( req.body.image  ) data.image    = req.body.image

    const result = req.db.get('albums').find({ id : req.params.id }).assign(data).write()
    if(result){
        console.log('Result : ', JSON.stringify(data))
        res.send(data)
    } else {
        res.status(500).send('<pre> 500 Error </pre>')
    }
}

// Put data to db
albums.put = (req, res)=>{
    const data = {
        title   : req.body.title,
        artist  : req.body.artist, 
        url     : req.body.url,
        image   : req.body.image
    }

    const result = req.db.get('albums').find({ id : req.params.id }).assign(data).write()
    if(result){
        console.log('Result : ', JSON.stringify(data))
        res.send(data)
    } else {
        res.status(500).send('<pre> 500 Error </pre>')
    }
}

// Check whether ID exists
albums.midIsExist = (req, res, next)=>{
    const data = req.db.get('albums').find({ id : req.params.id }).value()
    if(data){
        next()
    } else {
        res.status(404).send('<pre> 404 Not Found! </pre>')
    }
}

module.exports = albums