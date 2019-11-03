const shortid = require('shortid')

let techStacks = {}

// GET ALL albums data
techStacks.getAll = (req, res)=>{
    console.log(req.method, req.url)
    
    const result = req.db.get('techStacks').value()
    
    console.log('Result : ', JSON.stringify(result))
    res.send(result)
}

// GET techStacks data BY ID
techStacks.getByID = (req, res)=>{
    console.log(req.method, req.url)
    
    const result = req.db
        .get('techStacks')
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
techStacks.insert = (req, res)=>{
    console.log(req.method, req.url)
    
    const data = {
        id          : shortid.generate(),
        title       : req.body.title,
        description : req.body.description,
        url         : req.body.url
    }

    const result = req.db.get('techStacks').push(data).write()
    if(result){
        console.log('Result : ', JSON.stringify(data))
        res.send(data)
    } else {
        res.status(500).send('<pre> 500 Error </pre>')
    }
}

// Validation : data should contain title, description, & url
techStacks.midValidate = (req, res, next)=>{
    console.log(req.method, req.url)
    
    let { title, description, url } = req.body
    if( !title || !description || !url ){
        res.status(400).send('<pre> 400 Bad Request! </pre>')
    } else {
        next()
    }
}

// Delete data
techStacks.delete = (req, res)=>{
    console.log(req.method, req.url)

    const result = req.db.get('techStacks').remove({ id : req.params.id }).write()

    if(result){
        console.log('Result : ', JSON.stringify(result))
        res.send(result)
    } else {
        res.status(500).send('<pre> 500 Error </pre>')
    }
}

// Patch data
techStacks.patch = (req, res)=>{
    console.log(req.method, req.url)
    
    const data = {}
    if( req.body.title          ) data.title        = req.body.title
    if( req.body.description    ) data.description  = req.body.description
    if( req.body.url            ) data.url          = req.body.url

    const result = req.db.get('techStacks').find({ id : req.params.id }).assign(data).write()
    if(result){
        console.log('Result : ', JSON.stringify(data))
        res.send(data)
    } else {
        res.status(500).send('<pre> 500 Error </pre>')
    }
}

// Put data to db
techStacks.put = (req, res)=>{
    console.log(req.method, req.url)
    
    const data = {
        title       : req.body.title,
        description : req.body.description, 
        url         : req.body.url
    }

    const result = req.db.get('techStacks').find({ id : req.params.id }).assign(data).write()
    if(result){
        console.log('Result : ', JSON.stringify(data))
        res.send(data)
    } else {
        res.status(500).send('<pre> 500 Error </pre>')
    }
}

module.exports = techStacks