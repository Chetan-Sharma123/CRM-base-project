const multer=require('multer')


const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'../CRM/public/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
    
})

const upload=multer({storage:storage})
module.exports=upload

