// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCcgoGoTHLroUvcnjjfDgPy1sHzyWPAFX8",
    authDomain: "musicproject1-e582b.firebaseapp.com",
    databaseURL: "https://musicproject1-e582b.firebaseio.com",
    projectId: "musicproject1-e582b",
    storageBucket: "musicproject1-e582b.appspot.com",
    messagingSenderId: "1050934926486",
    appId: "1:1050934926486:web:e9fcdda165569b47"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

function initMap (){
  var austin = {
    lat: 30.2672,
    lng: -97.7431
  };
  var map = new google.maps.Map(document.getElementById("map"), {zoom: 10, center: austin});
  var marker = new google.maps.Marker({position: austin, map: map});
}

$(document).ready(function(){
  var mapBox = $("#map");
  var searchForm = $("#searchForm");
  mapBox.addClass("d-none");
  $("#searchButton").on("click", function(event){
    event.preventDefault();
    initMap();
    mapBox.removeClass("d-none");
    searchForm.addClass("d-none");
    $("#searchButton").addClass("d-none");
  });
});