document.getElementById('reg-btn').addEventListener('click',function(){
        document.getElementById('register-div').style.display="inline";
        document.getElementById('login-div').style.display="none";
        document.getElementById('admin-div').style.display="none";
});
document.getElementById('admin-btn').addEventListener('click',function(){
  document.getElementById('register-div').style.display="none";
  document.getElementById('login-div').style.display="none";
  document.getElementById('admin-div').style.display="inline";
});
document.getElementById('log-in-btn').addEventListener('click',function(){
        document.getElementById('register-div').style.display="none";
        document.getElementById('admin-div').style.display="none";
        document.getElementById('login-div').style.display="inline";
});
document.getElementById('login-btn-1').addEventListener('click',function(){
  document.getElementById('register-div').style.display="none";
  document.getElementById('admin-div').style.display="none";
  document.getElementById('login-div').style.display="inline";
});
const firebaseConfig = {
    apiKey: "AIzaSyDaPRPHd6sw09DB4VpHfpx6W6fuAYr_qWc",
    authDomain: "store-data-65df2.firebaseapp.com",
    databaseURL: "https://store-data-65df2-default-rtdb.firebaseio.com",
    projectId: "store-data-65df2",
    storageBucket: "store-data-65df2.appspot.com",
    messagingSenderId: "724606610653",
    appId: "1:724606610653:web:3462582fe3ff1d9167ff34",
    measurementId: "G-FKGPJP0Q29"
  };
const firebaseConfig1 = {
  apiKey: "AIzaSyBEwJV2zhRCCGZgEo_39dC1dhr_Vgu45r4",
  authDomain: "voting-log.firebaseapp.com",
  databaseURL: "https://voting-log-default-rtdb.firebaseio.com",
  projectId: "voting-log",
  storageBucket: "voting-log.appspot.com",
  messagingSenderId: "84061766566",
  appId: "1:84061766566:web:0edc65e7c19340eca94567",
  measurementId: "G-5RNWGZDY34"
};
var app = firebase.initializeApp(firebaseConfig);
var firebaseRef = app.database();
var app1 = firebase.initializeApp(firebaseConfig1, "app1");
var firebaseRef1 = app1.database();
var app2 = firebase.initializeApp(firebaseConfig,"app2");
var firebaseRef2 = app2.database().ref('admin');

firebaseRef.ref('user').on("value", function(snapshot){
    var voter_arr = [];
    var pass = [];
    var c=0;
    snapshot.forEach(function(element){
        c=voter_arr.push(element.key);
    })
    var i=0;
    snapshot.forEach(function(){
      pass.push(snapshot.child(''+voter_arr[i]).child('password').val());i++;
    })
    document.querySelector('#register-btn').addEventListener('click',()=>{
      const voter = document.getElementById('voter-id').value;
      const aadhaar = document.getElementById('aadhaar-id').value;
      const email = document.getElementById('email-id').value;
      const password = document.getElementById('register-password').value;
      const voterIdError = document.querySelector("#voter-id-error");
      const aadhaarNumberError = document.querySelector("#aadhaar-number-error");
      const emailError = document.querySelector("#email-error");
      const passwordError = document.querySelector("#password-error");
      var valid = true;
      if(voter_arr.indexOf(voter) != -1 ){
        valid=false;
        alert("You are already registered!");
      }
      else{
        if (voter.length !==6) {
          voterIdError.textContent = "Voter ID must be 6 characters long and no spaces.";
          valid = false;
        } else {
          voterIdError.textContent = "";
        }
        if (aadhaar.length!==12) {
          aadhaarNumberError.textContent = "Aadhaar Number must be 12 digits long between 0-9";
          valid = false;
        } else {
          aadhaarNumberError.textContent = "";
        }
        if (email.length<5 ) {
          emailError.textContent = "Please provide your email-id.";
          valid = false;
        } else {
          emailError.textContent = "";
        }
        if (password.length < 8) {
          passwordError.textContent = "Please enter a password of min 8 characters long.";
          valid = false;
        }
      }
      if (valid){
      var data = {
            voter: voter,
            aadhaar: aadhaar,
            email: email,
            password : password
      }
      var data1 = {
        voter: voter,
        flag: "F"
      }
      firebase.database().ref().child("user/"+voter).update(data);
      firebaseRef1.ref().child("voter/"+voter).update(data1);
      firebase.database().ref().update({count:(c+1)});
      firebaseRef1.ref().update({count:(c+1)});
      alert('Successfully Registered');
      location.reload();}
    });
    document.getElementById("login-btn").addEventListener("click",function(){
      var username = document.getElementById("user-id");
      var password = document.getElementById("login-password");
      if(  voter_arr.indexOf(username.value) > -1 ){
        if (pass[voter_arr.indexOf(username.value)] == password.value ){
              location.replace("support/home.html");
              sessionStorage.setItem("user", username.value);}
        else{password.style.borderColor="red";alert('Incorrect Password');}
      }
      else{username.style.borderColor="red";alert('Incorrect Username');}
    });
  });
  document.getElementById('login-password').addEventListener("input",function(){
    document.getElementById("login-password").style.borderColor="#ccc";
  });
  document.getElementById('user-id').addEventListener("input",function(){
    document.getElementById("user-id").style.borderColor="#ccc";
  });
  firebaseRef2.on("value", function(snapshot){
    var admin = [];
    var password = [];
    snapshot.forEach(function(element){
          admin.push(snapshot.child(element.key).child('username').val());
          password.push(snapshot.child(element.key).child('password').val());
    })
    document.getElementById("admin-login-btn").addEventListener("click",function(){
        var username1 = document.getElementById("admin-id");
        var password1 = document.getElementById("admin-password");
        if(  admin.indexOf(username1.value) > -1 ){
          if (password[admin.indexOf(username1.value)] == password1.value ){
                location.replace("support/adminPage.html");}
          else{password1.style.borderColor="red";alert('Incorrect Password');}
        }
        else{username1.style.borderColor="red";alert('Access Denied');}
    });
});
document.getElementById('admin-password').addEventListener("input",function(){
  document.getElementById("admin-password").style.borderColor="#ccc";
});
document.getElementById('admin-id').addEventListener("input",function(){
  document.getElementById("admin-id").style.borderColor="#ccc";
});
