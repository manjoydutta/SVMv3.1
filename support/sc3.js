const enrolled_voters = document.querySelector("#enrolled-voters");
const votes_polled = document.querySelector("#votes_polled");
const percentage_turnout = document.querySelector("#percentage_turnout");
var ctx = document.getElementById("pieChart").getContext("2d");
var resetButton = document.getElementById("reset-btn");
var stopSession = document.getElementById("stop-session");
document.getElementById('log-out-btn').addEventListener('click',function(){
    location.replace("../index.html");});
const firebaseConfig = {
  apiKey: "AIzaSyBEwJV2zhRCCGZgEo_39dC1dhr_Vgu45r4",
  authDomain: "voting-log.firebaseapp.com",
  databaseURL: "https://voting-log-default-rtdb.firebaseio.com",
  projectId: "voting-log",
  storageBucket: "voting-log.appspot.com",
  messagingSenderId: "84061766566",
  appId: "1:84061766566:web:0edc65e7c19340eca94567",
  measurementId: "G-5RNWGZDY34"
};
firebase.initializeApp(firebaseConfig);
firebase.database().ref('voter').on("value", function(snapshot){
  var voter_arr = [];
  var flag = [];
  var c=0;
  snapshot.forEach(function(element){
      c=voter_arr.push(element.key);
  })
  var i=0;
  snapshot.forEach(function(){
    flag.push(snapshot.child(''+voter_arr[i]).child('flag').val());i++;
  })
  enrolled_voters.textContent=c;
  var votted=flag.filter(element => element === "T").length;
  votes_polled.textContent=votted;
  percentage_turnout.textContent=(votted/c).toFixed(4)*100;
  var pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [ "Voters Voted","Did Not Vote"],
        datasets: [
          {
            label: "# of Votes",
            data: [flag.filter(element => element === "T").length, (c-flag.filter(element => element === "T").length)],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)","rgba(255, 99, 132, 0.2)"],
          //   borderColor: [
          //     "rgba(54, 162, 235, 1)","rgba(255, 99, 132, 1)"],
          //   borderWidth: 1
          }
        ]
      }
  });
    var i=0;
    resetButton.addEventListener("click", function() {
      if (votted>0){
        snapshot.forEach(function(){
          var data={
            voter:voter_arr[i],flag:"F"
          }
        firebase.database().ref('voter').child(""+voter_arr[i]).update(data);
        i++;
      })}
  })
  stopSession.addEventListener("click", function() {
      alert("Function Disabled");
  })
});