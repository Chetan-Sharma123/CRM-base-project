function loginshowpass(){
        let val=document.getElementById('pass')
       if(val.type=='password'){
        val.type="text"
       }else{
        val.type="password"
       }  
       
    }
