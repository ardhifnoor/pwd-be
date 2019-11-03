module.exports = (req, res, next)=>{
    console.log(req.method, req.url)
    if(Object.keys(req.body).length){
        console.log('BODY : ', JSON.stringify(req.body))
    }
    next()
}