const mongoose=require('mongoose')
const uuid=require('uuid')


const blogSchema=mongoose.Schema({
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
    createDate:{
        type:String,
        default:new Date(),
        required:true
    },
    blogId: { type: String, unique: true, default: uuid.v4 }
})

module.exports=mongoose.model('blog',blogSchema)