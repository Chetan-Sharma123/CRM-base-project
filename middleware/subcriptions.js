function subcriptions(req,res,next){
if(req.session.subcriptions=='free'){
    next()
}else{
    res.render('suscribeerror.ejs')
}

}


module.exports=subcriptions