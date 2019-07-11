// Firebase configuration for player data
var firebaseConfig = {
    apiKey: "AIzaSyCjQ9BQoSdS38bp1fuVeTNp9hg83Zb7jZs",
    authDomain: "ucscrun.firebaseapp.com",
    databaseURL: "https://ucscrun.firebaseio.com",
    projectId: "ucscrun",
    storageBucket: "",
    messagingSenderId: "934701608923",
    appId: "1:934701608923:web:c8eb9691838c47ed"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.firestore();


function savePlayerScore(name, score) {
    if (name != "") {
        database.collection("userInfo").add({
            playerName: name
            playerScore: score
        })
        .then(function() {
            console.log("Name: ", name, ", Score: ", score);
        })
        .catch(function(error) {
            console.error("Error: ", error);
        });
    }
}


