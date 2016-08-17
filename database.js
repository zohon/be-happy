// Initialize Firebase
var config = {
  apiKey: "AIzaSyAIcRpj2ZVuOqVm0Fbx16aXGHKjNC3rdZo",
  authDomain: "be-happy-fb01b.firebaseapp.com",
  databaseURL: "https://be-happy-fb01b.firebaseio.com",
  storageBucket: "be-happy-fb01b.appspot.com",
};
firebase.initializeApp(config);

function addToken(token) {
  firebase.database().ref('tokens/' + token).set({
    token: token
  });
}

function removeToken(token) {
  console.log("removeToken " + token);
  firebase.database().ref('tokens/' + token).remove(function(error) {
      console.log(error ? "Uh oh!" : "Success!");
  });
}
