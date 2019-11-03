let albums = {}

albums.getAll = (req, res)=>{
    console.log('GET ', req.url)
    const result = req.db.get('albums').value()
    console.log('Result : ', JSON.stringify(result))
    res.send(result)
}

module.exports = albums