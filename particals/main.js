function backgroundchange(){
    let bodyElement = document.getElementsByTagName('body')[0];
    if(bodyElement.style.backgroundColor === 'black'){  
       bodyElement.style.backgroundColor = 'white';
    }else{
        bodyElement.style.backgroundColor = 'black';
    }
}


