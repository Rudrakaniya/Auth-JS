// document.getElementById("index-container").style.display = "none";

var app_firebase = {};
(function () {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAn3vu5rUN5IKadTkX_TrBxQA9QJCySSTc",
    authDomain: "auth-js-e63b5.firebaseapp.com",
    projectId: "auth-js-e63b5",
    storageBucket: "auth-js-e63b5.appspot.com",
    messagingSenderId: "998790315781",
    appId: "1:998790315781:web:2425c765a4fc8a022dc16c",
    measurementId: "G-QEDRR2RX2F",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  console.log(firebase);
  app_firebase = firebase;
})();

app_firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // window.location.replace("/login.html");
    console.log("Inside ifff");
  }
});
