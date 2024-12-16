const wishlistTable=require('../models/wishlist')



exports.wishListData=async(req,res)=>{
    const username=req.session.username
    let message=''
    const allData=await wishlistTable.find({email:username})
    res.render('wishlist.ejs',{allData,username,message})

}