function validate()
{ 
   if( document.playerRegistration.fullname.value == "" )
   {
     alert( "Please provide your Full Name!" );
     document.playerRegistration.fullname.focus() ;
     return false;
   }
      
   if( document.playerRegistration.username.value == "" )
   {
     alert( "Please provide your username!" );
     document.playerRegistration.username.focus() ;
     return false;
   }
   if( document.playerRegistration.password.value == "" )
   {
     alert( "Please provide your password!" );
     document.playerRegistration.password.focus() ;
     return false;
   }
   
   if( document.playerRegistration.repassword.value == "" )
   {
     alert( "Please provide your password again!" );
     document.playerRegistration.repassword.focus() ;
     return false;
   }
    
   
 var email = document.playerRegistration.email.value;
  atpos = email.indexOf("@");
  dotpos = email.lastIndexOf(".");
 if (email == "" || atpos < 1 || ( dotpos - atpos < 2 )) 
 {
     alert("Please enter correct email ID")
     document.playerRegistration.emailid.focus() ;
     return false;
 }
  if( document.playerRegistration.avatar.value == "" )
   {
     alert( "Please provide your avater Id!" );
     document.playerRegistration.dob.focus() ;
     return false;
   }
  
   return( true );
}

function checkPass()
{
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    var message = document.getElementById('confirmMessage');
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    if(pass1.value == pass2.value){
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!"
    }else{
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
}  