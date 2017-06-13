
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
var firstTrainDeparts;
var trainEveryMinutes;
var timeRightNow;
var nextTrain;
var trainIntervals;
var dt = new Date();

var daySeconds = dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
console.log(daySeconds);

// Capture Button Click
$("#add-train").on("click", function() {
    // Don't refresh the page!
    //event.preventDefault();

    nameTrain = $("#name-input").val().trim();
    destinationTrain = $("#destination-input").val().trim();
    timeTrain = $("#time-input").val().trim();
    frequencyTrain = $("#frequency-input").val().trim();

    datePlaceholder += firstTrainDeparts;

    currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var startTimeInMins = moment(new Date(datePlaceholder));

        console.log(moment(startTimeInMins).format("HH:mm"));
        console.log(moment().format("HH:mm"));
        console.log(startTimeInMins.diff(timeRightNow, "minutes"));



       if (startTimeInMins.diff(timeRightNow, "minutes") >= 0) {
           nextTrain = moment(startTimeInMins).format("HH:mm");
           difference = startTimeInMins.diff(moment(), "minutes");

       }

       else {

           while (startTimeInMins.diff(timeRightNow, "minutes") < 0) {
               trainIntervals = startTimeInMins.add(trainEveryMinutes, 'minutes');

               console.log(startTimeInMins.diff(timeRightNow, "minutes"));
               console.log(moment(trainIntervals).format("HH:mm"));
           }

           difference = moment(trainIntervals).diff(timeRightNow, "minutes");
               console.log("the time between next train and now: " + difference);

           var nextTrainAvailable = timeRightNow.add(difference, 'minutes');
           nextTrain = moment(nextTrainAvailable).add(1, 'minutes').format("HH:mm");

            console.log("the next train is at: " + nextTrain);
       }




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

database.ref().on("child_added",function(childSnapshot){
    console.log(childSnapshot.val());

    var train = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    console.log(train);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    // var newTrain = $("<tr>");
    // var newName = $("<td>");
    // var newDestination = $("<td>");
    // var newDepart = $("<td>");
    // var newFrequency = $("<td>");
    // var newNextArrival = $("<td>");
    // var newMinutesAway = $("<td>");

    var trainInSecs = moment(time, "HH:mm");
    trainInSecs = ((trainInSecs._d.valueOf()/ 1000 ) % 86400);
    var secsToTrain = trainInSecs - daySeconds;
    var minsToTrain = secsToTrain /60;
    console.log(minsToTrain);
    var minutes = parseInt(minsToTrain);



    $("#trainTable > tbody").append(
        "<tr><td>" + train +
        "</td><td>" + destination +
        "</td><td>" + frequency +
        "</td><td>" + moment(time, "HH:mm").format('hh:mm A') +
        "</td><td>" + minutes + "</td></tr>");




});