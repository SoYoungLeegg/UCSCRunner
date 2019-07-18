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

// getting access to database
let db = firebase.firestore();

/* function to save player's name and score */
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

/* getTopPlayers(N): get N top player's name and score save it to
 *                   the array 'topPlayers' in promise
 * */
function getTopPlayers(N) {
    var playerData = db.collection("userInfo");
    let query = playerData.orderBy("score", "desc").limit(N);
    var topPlayers = [];
    var i = 0;
    var returnValue;
    var promise = query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            topPlayers[i] = doc.data();
            i = i + 1;
        });
        return topPlayers;
    });

    return promise;
}



