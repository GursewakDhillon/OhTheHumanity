
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

function signIn() {
    if (!firebase.auth().currentUser) {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;					
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
        }).then(function(user) {
            if (user){
                if (user && !user.emailVerified) {
                    alert("This account is not yet e-mail verified, please check your inbox!");
                    firebase.auth().signOut();
                }         
                else {
                    post('/', { "email": email } );
                }
            }
        });
    }
    else
    {
        firebase.auth().signOut();
    }
}

function forgotPassword() {
    var email = document.getElementById('email').value;
    if (email == "") {
        alert("Please enter in the email address you signed up with.");
        return;
    }
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert('Password reset email sent - please check your inbox!');
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
    console.log(error);
    });
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

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // signed in
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
            if (!user.emailVerified) {
                //alert("This account is not yet e-mail verified, please check your inbox!");
                firebase.auth().signOut();
            }
            else {
                post('/', { "email": email} );
            }
        }
        else {
            // user signed out
        }
    });
    document.getElementById('submitlogin').addEventListener('click', signIn, false);				
    document.getElementById('forgotpassword').addEventListener('click', forgotPassword, false);
}



window.onload = function() {
    initApp();
};
			
