

var config = {
    apiKey: "AIzaSyDpxbfKNpWR520va54yO4oYGxDePFuHgGQ",
    authDomain: "train-496de.firebaseapp.com",
    databaseURL: "https://train-496de.firebaseio.com",
    projectId: "train-496de",
    storageBucket: "train-496de.appspot.com",
    messagingSenderId: "405043368628"
  };

  firebase.initializeApp(config);
///create a variable to reference the database
  var database = firebase.database();

// When I click the submit button, do the following:
// Capture the data from the inputs  
  $("#add-train-btn").on("click", function() {
    event.preventDefault();
//logic for storing the values from the text boxes
    var newTrainName = $("#train-name-input").val().trim();
    var newDestination = $("#destination-input").val().trim();
    var newFirstTrainTime = moment($("#firstTrain-input").val().trim(),"HH:mm").format("HH:mm");
    var newFrequency = $("#frequency-input").val().trim();
 //Console the inputs for debugging   
    console.log(newTrainName);
    console.log(newDestination);
    console.log(newFirstTrainTime);
    console.log(newFrequency);

// Create a new object and push it to the database
    var newTrain = {

        name: newTrainName,
        dest: newDestination,
        first: newFirstTrainTime,
        freq: newFrequency,
    }


//code for "setting values in the database
    database.ref().push(newTrain);

    //Alert("Train successfully added");

// Clear out the form fields
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");

//prevents moving to a new page
    return false;
  });

//Creates a firebase event for adding trains to the database and a row
//to the html when a user adds an entry.
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
  console.log(childSnapshot.val());

  var newName = childSnapshot.val().name;
  var newDestination = childSnapshot.val().dest;
  var newFirstTrainTime = childSnapshot.val().first;
  var newFrequency = childSnapshot.val().freq;

//Console log the input data from the user:  
  console.log("New Train Name: " + newName);
  console.log("New First Train Time:", newFirstTrainTime)
  console.log("New Destination: " + newDestination);
  console.log("New Frequency: " + newFrequency);

  //Time calculations
    // var differenceTimes = moment().diff(moment.unix(newFirstTrainTime), "minutes");
    // var tRemainder = moment().diff(moment.unix(newFirstTrainTime), "minutes") % newFrequency;
    // var tMinutes = newFrequency - tRemainder;

    var currentTime = moment();
    var firstTimeConverted = moment(newFirstTrainTime, "HH:mm").subtract(1, "days");

   timeDiff = moment().diff(moment(firstTimeConverted, "minutes"));
    // time apart
    var tRemainder = timeDiff % newFrequency;

    //Minutes until the next train arrives
    var tMinutes = newFrequency - tRemainder

    var tArrival = moment().add(tMinutes, "minutes");




    //var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    console.log("Arrival Time:", tArrival);
    console.log("Minutes Away:", tMinutes);
    console.log("Remainder:", tRemainder);  
    console.log("UNIX epoch:", moment().format("X"));
    

    $("#train-table > tbody").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + moment(tArrival).format("LT") + "</td><td>" + tMinutes + "</td></tr>");
});


 // }, function(errorObject) {
 //      console.log("Errors handled: " + errorObject.code);
 //    });