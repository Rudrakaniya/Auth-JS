document.getElementById("index-container").style.display = "none";

console.log(document.getElementById("index-container"));

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
const mUID = document.getElementById("mUID");
const mLogout = document.getElementById("mLogout");
const mDeleteAccount = document.getElementById("mDeleteAccount");

let userID;

app_firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log(user);
    document.getElementById("index-container").style.display = "flex";
    document.getElementById("container-loading-img").style.display = "none";

    mName.innerText = user.displayName;
    mEmail.innerText = user.email;
    mUID.innerText = user.uid;
    userID = user.uid;
  } else {
    window.location.replace("/login.html");
  }
});

mLogout.addEventListener("click", () => {
  app_firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.replace("/login.html");
    });
});

mDeleteAccount.addEventListener("click", () => {
  console.log("click");
  app_firebase
    .auth()
    .currentUser.delete()
    .then(() => {
      console.log("Successfully deleted user");
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
    });
});
