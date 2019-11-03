let albums = {}

albums.getAll = (req, res)=>{
    console.log('GET ', req.url)
    
    const result = req.db
        .get('albums')
        .value()
    
    console.log('Result : ', JSON.stringify(result))
    res.send(result)
}

albums.getByID = (req, res)=>{
    console.log('GET ', req.url)
    
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

module.exports = albums