const express=require('express')
const app=express()
app.use(express.urlencoded({extended:false}))
require('dotenv').config()
require('./dbconnections/dbconfig')
const session=require('express-session')
const adminRouter=require('./routers/adminrouter')
const usersRouter=require('./routers/usersrouter')
const authRouter=require('./routers/authrouter')











app.use(session({
    secret:'abc',
    resave:false,
    saveUninitialized:false,

}))
app.use('/admin',adminRouter)
app.use('/auth',authRouter)
app.use(usersRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.get('*',(req,res)=>{
    res.send("page not found")
})
app.listen(process.env.PORT,()=>{
    console.log(`Port ${process.env.PORT} is where the server is currently running. `)
})