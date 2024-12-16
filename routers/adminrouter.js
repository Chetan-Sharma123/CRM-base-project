const router=require('express').Router()
const authc=require('../controllers/authcontroller')
const logincheck=require('../middleware/logincheck')
const blogc=require('../controllers/blogcontroller')





router.get('/',logincheck,authc.adminDeshboard)
router.get('/usermangement/:message',logincheck,authc.users)
router.get('/delete/:id',authc.deleteuser)

router.get('/updatestatus/:id/:status',authc.updatestatus)









module.exports=router