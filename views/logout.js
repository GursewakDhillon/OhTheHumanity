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

function signOut() {
    //debugger;
    firebase.auth().signOut();
}

//function initApp() {
    //document.getElementById('logoutbutton').addEventListener('click', signOut, false);				
//    debugger;
//}

//window.onload = function() {
//    initApp();
//};
			
