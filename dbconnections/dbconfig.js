const mongoose=require('mongoose')
const env=require('dotenv').config()


mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`).then(()=>{
    console.log(`Database is successfully ${process.env.DATABASE_URL}connected to ${process.env.DATABASE_NAME}`)
}).catch((error)=>{
    console.log(error.message)
})