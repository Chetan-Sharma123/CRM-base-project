const blogTable=require('../models/blog')
const wishlistTable=require('../models/wishlist')
const mongoose=require('mongoose')

exports.manageBlog=async(req,res)=>{
    const username=req.session.username
    const blogAllData=await blogTable.find({createBy:username})
    const message=req.params.message
    res.render('mangeblog.ejs',{username,blogAllData,message})

}

exports.blogform=async(req,res)=>{
    const message=req.params.message
    const username=req.session.username
    res.render('addnewblog.ejs',{username,message})

}

exports.blogformpost=async(req,res)=>{
    let message=''
    const username=req.session.username
    const {title,desc}=req.body
    try{
        if(!title){
            throw new Error("please could not Blank Title !!!")
        }
        else if(!desc){
            throw new Error("please could not Blank Descriptions !!!")
        }
    const blogData=new blogTable({title:title,desc:desc,createBy:username})
    blogData.save()
    message="The blog was created successfully."
    }catch(error){

        message=error.message

    }
    
    res.redirect(`/addnewblog/${message}`)

}

exports.deleteBlog=async(req,res)=>{
    const id=req.params.id
    let message=''
    try{
        if(!mongoose.isValidObjectId){
            throw new Error("ID could note'match'.")
        }
        await blogTable.findByIdAndDelete(id)
        message="Delete Are Successfully"
    }
    
    catch(error){
        message=error.message

    }
res.redirect(`/manageblog/${message}`)
    

    

}

exports.updateblog=async(req,res)=>{
    const username=req.session.username
    const id=req.params.updateId
    const data=await blogTable.findById(id) 
    res.render('updateblog.ejs',{username,data})

}

exports.updateblogpost=async(req,res)=>{
    const id=req.params.updateId
    const{title,desc}=req.body
    await blogTable.findByIdAndUpdate(id,{title:title,desc:desc})
    res.redirect('/manageblog/mess')
 }
exports.showallblog=async(req,res)=>{
    const username=req.session.username
    res.render('showview.ejs',{username})
}


exports.pagnations=async(req,res)=>{
    
    const message=req.params.message
    const currentPage=req.params.pages
    const username=req.session.username
  
    const num = parseInt(req.query.page) || currentPage;
    const page = parseInt(num, 10);
    const perpage=3;
    const totalCount=await blogTable.countDocuments({})
    const totalPage=Math.ceil(totalCount/perpage)
    const allCountPage=await blogTable.find().skip((page-1)*3).limit(perpage).exec();
    res.render('showview.ejs',{username,totalPage,allCountPage,page,message})
}

exports.wishlist=async(req,res)=>{
    let message=''
    const id=req.params.wishlistId
    const blogsId=req.params.blogId
    const username=req.session.username
    try{
    const{title,desc,createBy,blogId}=await blogTable.findById(id)
    const{blogIdWish}=await wishlistTable.findOne()
    
        if(blogIdWish==null){
            const datawishlist=await new wishlistTable({title:title,desc:desc,createBy:createBy,email:username})
        datawishlist.save()
        }else{
            console.log('no')
        }
        
    message='Congratulations have been added successfully, thank you'
   }catch(error){
        message=error.message
   }   
   res.redirect(`/pagination/hh/${message}`)
}