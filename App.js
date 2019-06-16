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

var artist;
var results = $("#results");
var searchForm = $("#searchForm");
var jumbotron = $("#jumbotron");

function LinkFormatter(value, row, index) {
  return "<a href='https://www.google.com/search?q="+value+"' target='_blank'>"+value+"</a>";
}

function lastGet(artist) {
  var lastAPI = "7b47760fe2aa1770bcb7927be1cb9d72";
  var lastQuery = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + lastAPI + "&format=json"
  $.ajax({
    url: lastQuery,
    method:"GET"
  }).then(function(response){
    console.log(response.artist);
    var band = response.artist;
    // var bandImg = $("<img class='card-image-top' alt='searched artist'>");
    // bandImg.attr("src", band.image["1"]["#text"]);
    var name = $("<h5 class='card-title'>");
    var bandDiv = $("<div class='card-body'>");
    var bandSum = $("<p class='card-text'>");
    name.append(band.name);
    bandSum.append(band.bio.summary);
    bandDiv.append(name, bandSum);
    $("#lastFM").append(bandDiv);
  })
}

$(document).ready(function(){
  results.addClass("d-none");
});

$("#searchButton").on("click", function(event){
  event.preventDefault();
  initMap();
  jumbotron.addClass("d-none");
  results.removeClass("d-none");
  searchForm.addClass("d-none");
  $("#searchButton").addClass("d-none");
  artist = $("#bandInput").val();
  lastGet(artist);
  database.ref().set({
    searchBand: artist
  });
  $("#resultsTable").removeClass("d-none");
  console.log(artist);
});

$("#newSearchButton").on("click", function(event){
  event.preventDefault();
  artist = $("#newBandInput").val();
  lastGet(artist);
  database.ref().set({
    searchBand: artist
  });
});

database.ref().on("value", function(snapshot){
  console.log(snapshot.val());
  var band = snapshot.val().searchBand;
  $("#resultsTable > tbody").append(
    $("<tr>").prepend(
      $("<td>").prepend(LinkFormatter(band))
    )
  );
  $("#lastFM").empty();
});