const router=require('express').Router()
const authc=require('../controllers/authcontroller')
const logincheck=require('../middleware/logincheck')
const blogc=require('../controllers/blogcontroller')
const subCheck=require('../middleware/subcriptions')
const wishlistc=require('../controllers/whislistcontroller')
const upload=require('../middleware/multer')
router.get('/',logincheck,(req,res)=>{
    const username=req.session.username
    res.render('home.ejs',{username})
})


router.get('/logout',authc.logout)
router.get('/changepassword',logincheck,authc.changepassword)
router.post('/changepassword',authc.changepasswordpost)

router.get('/updateprofile/:message',logincheck,authc.updateprofileform)
router.post('/updateprofile/:message/',upload.single('img'),authc.updatepro)

router.get('/manageblog/:message',logincheck,blogc.manageBlog)
router.get('/addnewblog/:message',logincheck,blogc.blogform)
router.post('/addnewblog/:message',blogc.blogformpost)
router.get('/deleteblog/:id',logincheck,blogc.deleteBlog)
router.get('/updateblog/:updateId',logincheck,blogc.updateblog)
router.post('/updateblog/:updateId',blogc.updateblogpost)
router.get('/showBlog',logincheck,blogc.showallblog)
router.get('/viewprofile',logincheck,authc.profile)
router.get('/pagination/:pages/:message',logincheck,blogc.pagnations)
router.get('/wishlist/:wishlistId/:blogId',blogc.wishlist)
router.get('/wishlist',wishlistc.wishListData)

module.exports=router