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

let db = firebase.firestore();


function savePlayerScore(playerName, playerScore) {
    if (playerName != "") {
        db.collection("userInfo").add({
            name: playerName,
            score: playerScore
        })
        .then(function() {
            console.log("Name: ", playerName, ", Score: ", playerScore);
        })
        .catch(function(error) {
            console.error("****Error: ", error);
        });
    } else {
        console.log("No player name");
    }
}


