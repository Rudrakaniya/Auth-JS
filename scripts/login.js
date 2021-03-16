import alertbox from "./alertBoxModule.js";

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

const mEmail = document.getElementById("mEmail");
const mPassword = document.getElementById("mPassword");
const mLogin = document.getElementById("mLogin");
const mNeedAccount = document.getElementById("need-account");
const mToBeSpinner = document.getElementById("to-be-spinner");

let userEmail;
let userPassword;

app_firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log("zzzz");
    window.location.replace("/");
  } else {
    document.getElementById("login-root").style.display = "flex";
    document.getElementById("container-loading-img").style.display = "none";
  }
});

function userLogin() {
  userEmail = mEmail.value;
  userPassword = mPassword.value;

  app_firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((response) => {
      console.log(response);
      saveUser();
    })
    .catch((e) => {
      console.log(e);
      alertbox.show(e.code + "\n" + e.message);
      setTimeout(() => {
        mLogin.disabled = false;
        mToBeSpinner.src = "images/lock.svg";
        mToBeSpinner.style.height = "16px";
        mToBeSpinner.style.top = "unset";
        mToBeSpinner.style.left = "10px";
      }, 2000);
    });
}

function saveUser() {
  console.log("We are in");
  app_firebase
    .auth()
    .setPersistence(app_firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return app_firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, userPassword);
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
      // var errorCode = error.code;
      // var errorMessage = error.message;
    });
  window.location.replace("/index.html");
}

mLogin.addEventListener("click", (action) => {
  action.preventDefault();
  mToBeSpinner.src = "images/spinner_white.svg";
  mLogin.disabled = true;
  setTimeout(() => {
    mToBeSpinner.style.height = "40px";
    mToBeSpinner.style.top = "-2px";
    mToBeSpinner.style.left = "1px";
  }, 50);
  userLogin();
});

function onSignup() {
  location.href = "/signup.html";
}

mNeedAccount.addEventListener("click", onSignup);
