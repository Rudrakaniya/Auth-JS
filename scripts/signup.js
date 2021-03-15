document.getElementById("root").style.display = "none";

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

const mName = document.getElementById("mName");
const mEmail = document.getElementById("mEmail");
const mPassword = document.getElementById("mPassword");
const mConfPassword = document.getElementById("mConfPassword");
const mCreateAccount = document.getElementById("mCreateAccount");
const mCreateAccountSpinner = document.getElementById("to-be-spinner");
const mAlreadyUser = document.getElementById("already-user");

let userName;
let userEmail;
let userPassword;
let userConfPassword;
let passwordMatch = false;

mPassword.addEventListener("keyup", () => {
  userPassword = mPassword.value;
  //   console.log(userPassword);
});

mConfPassword.addEventListener("keyup", () => {
  userConfPassword = mConfPassword.value;
  console.log(userConfPassword);
  if (userConfPassword !== userPassword) {
    mConfPassword.style.boxShadow = "0 0 0 .5pt #fc2c2c";
    passwordMatch = false;
  } else {
    mConfPassword.style.boxShadow = "0 0 0 .5pt #c3d9f8";
    passwordMatch = true;
  }
});

function signUpUser() {
  app_firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((response) => {
      console.log(response);
      saveUser();
      return response.user.updateProfile({
        displayName: userName,
      });
    })
    .then(() => {
      window.location.replace("/index.html");
    })
    .catch((e) => {
      console.log(e);
    });
}

app_firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log(user);
    window.location.replace("/index.html");
  } else {
    document.getElementById("root").style.display = "flex";
    document.getElementById("container-loading-img").style.display = "none";
  }
});

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
}

function submitBtnClicked() {
  userName = mName.value;
  userEmail = mEmail.value;
  mCreateAccountSpinner.src = "images/spinner_white.svg";
  mCreateAccountSpinner.style.height = "40px";
  mCreateAccountSpinner.style.top = "-2px";
  mCreateAccountSpinner.style.left = "1px";
  mCreateAccount.disabled = true;

  signUpUser();
}

mCreateAccount.addEventListener("click", (action) => {
  action.preventDefault();
  submitBtnClicked();
});

mAlreadyUser.addEventListener("click", () => {
  console.log("click");
  // window.location.replace("/login.html");
  // window.location.href = "/login.html";

  window.history.pushState("", "", "/login.html");
});

console.log("Ho ho ho!!");
