// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAs7I_Csh8-80JQnVPJA_tiyG9zEkJTOR0",
  authDomain: "kaquimusic.firebaseapp.com",
  databaseURL: "https://kaquimusic.firebaseio.com",
  projectId: "kaquimusic",
  storageBucket: "",
  messagingSenderId: "536533706423",
  appId: "1:536533706423:web:8040afb383cce8e3"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function initMap (){
  var austin = {
    lat: 30.2672,
    lng: -97.7431
  };
  var map = new google.maps.Map(document.getElementById("map"), {zoom: 12, center: austin});
  var marker = new google.maps.Marker({position: austin, map: map});
}

var searchBand;
var mapBox = $("#map");
var searchForm = $("#searchForm");

function LinkFormatter(value, row, index) {
  return "<a href='https://www.google.com/search?q="+value+"' target='_blank'>"+value+"</a>";
}

$(document).ready(function(){
  mapBox.addClass("d-none");
  $("#resultsTable").addClass("d-none");
});

$("#searchButton").on("click", function(event){
  event.preventDefault();
  initMap();
  mapBox.removeClass("d-none");
  searchForm.addClass("d-none");
  $("#searchButton").addClass("d-none");
  searchBand = $("#bandInput").val();
  database.ref().set({
    searchBand: searchBand
  });
  $("#resultsTable").removeClass("d-none");
  console.log(searchBand);
});

database.ref().on("value", function(snapshot){
  console.log(snapshot.val());
  var band = snapshot.val().searchBand;
  $("#resultsTable > tbody").append(
    $("<tr>").append(
      $("<td>").append(LinkFormatter(band))
    )
  );
});