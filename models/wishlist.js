const mongoose=require('mongoose')
const uuid=require('uuid')

const wishlistSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    createBy:{
        type:String,
        required:true
    },
    email:{
        type:String,
       
    },
     blogId: { type: String, unique: true, default: uuid.v4 },
})

module.exports=mongoose.model('wishlist',wishlistSchema)