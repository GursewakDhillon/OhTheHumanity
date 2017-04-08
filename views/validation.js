// Initialize Firebase
var config = {
    apiKey: "AIzaSyDZQTUi5bZYnb1ZoXDzIUnZ8U0ksvc40Bs",
    authDomain: "ohthehumanity-8dafd.firebaseapp.com",
    databaseURL: "https://ohthehumanity-8dafd.firebaseio.com",
    projectId: "ohthehumanity-8dafd",
    storageBucket: "ohthehumanity-8dafd.appspot.com",
    messagingSenderId: "915346635051"
};
firebase.initializeApp(config);
//debugger;

function validate()
{ 
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass1').value;  
    var repassword = document.getElementById('pass2').value;         
    var avatar = document.getElementById('avatar').value;
    var fullname = document.getElementById('fullname').value;  
    var username = document.getElementById('username').value; 

   if( fullname == "" )
   {
     alert( "Please provide your Full Name!" );
     document.getElementById('fullname').focus() ;
     return false;
   }
      
   if( username == "" )
   {
     alert( "Please provide your username!" );
     document.getElementById('username').focus();
     return false;
   }
   if( password == "" )
   {
     alert( "Please provide your password!" );
     document.getElementById('pass1').focus();
     return false;
   }
   
   if( repassword == "" )
   {
     alert( "Please provide your password again!" );
     document.getElementById('pass2').focus();
     return false;
   }
    
 atpos = email.indexOf("@");
 dotpos = email.lastIndexOf(".");
 if (email == "" || atpos < 1 || ( dotpos - atpos < 2 )) 
 {
     alert("Please enter correct email ID")
     document.getElementById('email').focus() ;
     return false;
 }
  if( avatar == "" )
   {
     alert( "Please provide your avater Id!" );
     document.getElementById('avatar').focus() ;
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

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

function createUser()
{
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass1').value;      
    var avatar = document.getElementById('avatar').value;
    var fullname = document.getElementById('fullname').value;  
    var username = document.getElementById('username').value; 

    if (validate())
    {    
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        return;
      }).then(function() {
        console.log("user successfully registered");
        post('/registration', { "email": email, "avatar": avatar, "username": username, "fullname": fullname });
      }).then(function() {
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          alert('Email Verification Sent, please check your inbox.');
          firebase.auth().signOut();
        });
      });
    }
    else
    {
      console.log("There are still validation errors, not adding user");
    }
}

window.onload = function() {
    document.getElementById('registrationsubmit').addEventListener('click', createUser, false);		
};
		