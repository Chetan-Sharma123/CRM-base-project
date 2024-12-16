const router=require('express').Router()
const nodemailer=require('nodemailer')
const authc=require('../controllers/authcontroller')
const blogc=require('../controllers/blogcontroller')
const upload=require('../middleware/multer')


router.get('/',authc.loginform)
router.post('/',authc.loginformpost)
router.get('/forgetemail',authc.forgetmailform)
router.post('/forgetemail',authc.forgetmailink)



router.get('/forgetgmailpassword',(req,res)=>{
    res.send("forget password.....")

})

router.get('/createaccount',authc.createaccountpage)
router.post('/createaccount',upload.single('img'),authc.createaccountpost)


router.get('/varifylink/:id',authc.varifyaccount)

router.get('/forgotpasswordchangeform/:id',authc.forgetnewpasswordform)
router.post('/forgotpasswordchangeform/:id',authc.forgotnewpassword)



module.exports=router