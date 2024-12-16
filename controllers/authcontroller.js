const authTable = require("../models/auth");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const mongoose=require('mongoose')
const fs=require('fs')

exports.createaccountpage = (req, res) => {
  let message = "";
  
  res.render("auth/createaccountform.ejs", { message });
};

exports.createaccountpost = async (req, res) => {
  let message = "";
  const filename=req.file.filename
  const { fname, lname, email, pass, dob, gen } = req.body;
  const checkemail = await authTable.findOne({ email: email });
  try {
    let cpass = await bcrypt.hash(pass, 10);
    if (!fname) {
      throw new Error("please could not Blank First Name !!!");
    } else if (!lname) {
      throw new Error("please could not Blank Last Name !!!");
    } else if (!email) {
      throw new Error("please could not Blank Email !!!");
    } else if (!pass) {
      throw new Error("please could not Blank Password !!!");
    } else if (!dob) {
      throw new Error("please could not Blank Dob");
    } else if (!gen) {
      throw new Error("please could not Blank Gender");
    } else if (checkemail != null) {
      throw new Error("Already Exists email");
    }
    else if (!filename) {
      throw new Error("Image could not Blank");
    }
    const createaccountdata = new authTable({
      firstname: fname,
      lastname: lname,
      email: email,
      password: cpass,
      dob: dob,
      gender: gen,
      img:filename
    });
    createaccountdata.save();
    const id = createaccountdata.id;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "nodetest73@gmail.com",
        pass: "ijgwkwkywrcevsvg",
      },
    });
    await transporter.sendMail({
      from: "nodetest73@gmail.com", // sender address
      to: email, // list of receivers
      subject: "VARIFICATIONS LINKS", // Subject line
      text: "VARIFICATIONS LINKS", // plain text body
      html: `<a href=http://localhost:5000/auth/varifylink/${id}>VARIFICATIONS LINKS</a>`, // html  body
    });
    message =
      "Successfully Create Account!!! and please check your email for account varifications !!!!";
  } catch (error) {
    message = error.message;
  }
  res.render("auth/createaccountform.ejs", { message });
};

exports.varifyaccount = async (req, res) => {
  const id = req.params.id;
  await authTable.findByIdAndUpdate(id, { status: "active" });
  res.render("auth/active.ejs");
};
exports.forgetmailform = (req, res) => {
  let message = "";
  res.render("auth/forgetemailform.ejs", { message });
};
exports.forgetmailink = async (req, res) => {
  let message = "";
  const { email } = req.body;
  try {
    if(!email){
      throw new Error("The email field cannot be blank.");
    }
    const emailvalidations = await authTable.findOne({ email: email });
    if (emailvalidations == null) {
      throw new Error("Email cannot be found.");
    }
    const id = emailvalidations.id;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "nodetest73@gmail.com",
        pass: "ijgwkwkywrcevsvg",
      },
    });
    await transporter.sendMail({
      from: "nodetest73@gmail.com", // sender address
      to: email, // list of receivers
      subject: "FORGET PASSWORD", // Subject line
      text: "Click on below ink to genderate new  password", // plain text body
      html: `<a href='http://localhost:5000/auth/forgotpasswordchangeform/${id}'>Click to generate password</a>`, // html body
    });
    message = "forgot link has been send your Registered EMail Id";
  } catch (error) {
    message = error.message;
  }
  res.render("auth/forgetemailform.ejs", { message });
};
exports.forgetnewpasswordform = (req, res) => {
  let message = "";
  res.render("auth/forgotpasswordchangeform.ejs", { message });
};

exports.forgotnewpassword = async (req, res) => {
  let message = "";
  const { Pass, confirmpass } = req.body;
  const id = req.params.id;

  try {
    if (Pass !== confirmpass) {
      throw new Error("password could not match !!!");
    }
    let convertpass = await bcrypt.hash(Pass, 10);
    await authTable.findByIdAndUpdate(id, { password: convertpass });
    res.render("auth/changepassword.ejs");
  } catch (error) {
    message = error.message;
    res.render("auth/forgotpasswordchangeform.ejs", { message });
  }
};

exports.loginform = (req, res) => {
  let message = "";
  res.render("auth/login.ejs", { message });
};

exports.loginformpost = async (req, res) => {
  let message = "";
  const { email, pass } = req.body;

  try {
    
    if (!email) {
      throw new Error("Email could not Blank.");
    } else if (!pass) {
      throw new Error("password could note Blank");
    }
    const data = await authTable.findOne({ email: email });
    if(data==null){
      throw new Error("The email is not available.");
    }
    const comparepassword = await bcrypt.compare(pass, data.password);
    
    if (data !== null) {
      if (comparepassword == true) {
        if(data.status!=="suspended"){
          req.session.username=email
          req.session.isAuth=true
          req.session.userId=data.id
          req.session.subcriptions=data.suscriptions
          if(data.role=='user'){
            res.redirect('/pagination/hh/yy')
          }else{
            res.redirect('/admin/')
          }
        
      }else{
        throw new Error("The Account is suspended please check your Email and Active Account link")
      }
      } else {
        throw new Error("Password is not correct");
      }
    } else {
      throw new Error("The email is incorrect");
    }
  

  } catch (error) {
    message = error.message;
    res.render("auth/login.ejs", { message });
  }
  
};

exports.logout=(req,res)=>{
  req.session.destroy()
  res.redirect('/auth/')
}

exports.changepassword=(req,res)=>{
  let message=''
  const username=req.session.username
  res.render('changepassword.ejs',{username,message})

}
exports.changepasswordpost=async(req,res)=>{
  let message=''
  const username=req.session.username
  const{cpass,npass,confirmpass}=req.body
  const userdata=await authTable.findOne({email:username})
  const currentpassword=userdata.password
  const id=userdata.id
  const varifypass=await bcrypt.compare(cpass,currentpassword)
  try{
    if(!cpass){
      throw new Error("current password is not Blank")

    }
    else if(!npass){
      throw new Error("New password is not Blank")

    }
    else if(!confirmpass){
      throw new Error("confirm password is not Blank")

    }
    else if(npass!==confirmpass){
      throw new Error(" The new password and the confirmation password do not match. ")
    }
    else if(!varifypass){
      throw new Error("The current password does not match")
    }
    const encryptpass=await bcrypt.hash(confirmpass,10)
    await authTable.findByIdAndUpdate(id,{password:encryptpass})
    message='The password has been successfully changed'
    req.session.destroy()
  }

  catch(error){
    message=error.message

  }
  res.render('changepassword.ejs',{message,username})

}

exports.updateprofileform=async(req,res)=>{
  const message=req.params.message
  const username=req.session.username
  const userProfileData=await authTable.findOne({email:username})
  res.render("updateprofile.ejs",{username,userProfileData,message})

}

exports.updatepro=async(req,res)=>{
  let message=''
  
  const{fname,lname,gen}=req.body
  try{
  const username=req.session.username
  const id=req.session.userId
 if(req.file){
  const filename=req.file.filename
  await authTable.findByIdAndUpdate(id,{firstname:fname,lastname:lname,gender:gen,img:filename})
 }else{
  await authTable.findByIdAndUpdate(id,{firstname:fname,lastname:lname,gender:gen})
 }
  
  message="Profile update has been successfully completed"
  }catch(error){
    message=error.message
  }
  res.redirect(`/updateprofile/${message}`)
  
}


exports.adminDeshboard=async(req,res)=>{
  const allRecords=await authTable.find().count()
  const adminuser=await authTable.find({role:'admin'}).count()
  const userlogin=await authTable.find({role:'user'}).count()
  const activeAccount=await authTable.find({status:'active'}).count()
  const suspendedAccount=await authTable.find({status:'suspended'}).count()
  const username=req.session.username


  res.render('admin/deshboard.ejs',{username,allRecords,adminuser,userlogin,activeAccount,suspendedAccount})
}

exports.users=async(req,res)=>{
  const message=req.params.message
  const username=req.session.username
  const userData=await authTable.find().sort({createdate:-1})
  

  res.render('admin/usermanagement.ejs',{username,userData,message})
}

exports.deleteuser=async(req,res)=>{
  let message=''
  const id=req.params.id
  try{
  await authTable.findByIdAndDelete(id)
  
  message='delete has been successfully'
}catch(error){
  message=error.message

}
res.redirect(`/admin/usermangement/${message}`)

}

exports.updatestatus=async(req,res)=>{
  let message=''
  const id=req.params.id
  const status=req.params.status
  try{
    if(!mongoose.isValidObjectId(id)){
      throw new Error("It is possible to record a valid ID")
      
    }
    if(status=='active'){
      await authTable.findByIdAndUpdate(id,{status:'suspended'})
    }else{
      await authTable.findByIdAndUpdate(id,{status:'active'})
    }
    
   message="successfully Update status"
  
  }catch(error){
    message=message.error

  }
  res.redirect(`/admin/usermangement/${message}`)
  
}

exports.profile=async(req,res)=>{
  const username=req.session.username
  const data=await authTable.findOne({email:username})
   res.render('viewprofile.ejs',{username,data})

}

