
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
        });
        debugger;
    }
    else
    {
        debugger;
        firebase.auth().signOut();
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
          debugger;
          post('/', { "email": email} );
        }
        else {
            // user signed out
        }
    });
    document.getElementById('submitlogin').addEventListener('click', signIn, false);				
}



window.onload = function() {
    initApp();
};
			
