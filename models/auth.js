const mongoose=require('mongoose')



const authSchema=mongoose.Schema({
    firstname:{
        type:'String',
        required:true
    },
    lastname:{
        type:'String',
        required:true
    },
    
    email:{
        type:'String',
        required:true
    },

    password:{
        type:'String',
        required:true
    },
    
    dob:{
        type:'String',
        required:true
    },
     
    gender:{
        type:'String',
        required:true
    },
    img:{
        type:String,
        required:true
    },
    createdate:{
        type:Date,
        default:new Date(),
        required:true
    },
    status:{
        type:'String',
        default:'suspended',
        required:true
    },
    role:{
        type:'String',
        default:'user',
        required:true
    },
    suscriptions:{
        type:String,
        required:true,
        default:'free'

    },
   
})


module.exports=mongoose.model('auth',authSchema)