
function update() {
    $('#clock').html(moment().format('D. MMMM YYYY H:mm:ss'));
}
setInterval(update, 1000);

//  Initialize Firebase
var config = {
    apiKey: "AIzaSyBeFxTNYMvNV4ft5k0j0mwhOYTklGkGFac",
    authDomain: "train-schedule-d825a.firebaseapp.com",
    databaseURL: "https://train-schedule-d825a.firebaseio.com",
    projectId: "train-schedule-d825a",
    storageBucket: "train-schedule-d825a.appspot.com",
    messagingSenderId: "883112381390"
};
firebase.initializeApp(config);

var database = firebase.database();




// Initial Values
var nameTrain = "";
var destinationTrain = "";
var timeTrain = 0;
var frequencyTrain = "";
var datePlaceholder = moment().format("YYYY MM DD") + " ";
var currentTime;

// Capture Button Click
$("#add-train").on("click", function() {
    // Don't refresh the page!
    //event.preventDefault();

    nameTrain = $("#name-input").val().trim();
    destinationTrain = $("#destination-input").val().trim();
    timeTrain = $("#time-input").val().trim();
    frequencyTrain = $("#frequency-input").val().trim();

    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    database.ref().push({
        train:nameTrain,
        destination:destinationTrain,
        time:timeTrain,
        frequency:frequencyTrain
    });

    console.log(nameTrain);
    console.log(destinationTrain);
    console.log(timeTrain);
    console.log(frequencyTrain);

    alert("Train added");

    $("#name-input").val(' ');
    $("#destination-input").val(' ');
    $("#time-input").val(' ');
    $("#frequency-input").val(' ');


    // reset datePlaceholder
    datePlaceholder = moment().format("YYYY MM DD") + " ";

    return false;

});
