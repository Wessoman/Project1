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

var map;
var marker;
var artist;
var discAPI = "nbWzmDGOIWYNqEfTMUMf";
var discSecret = "xXsCUsgkVJoNlsefHTBKmLfWKpdcTeAq";
var results = $("#results");
var searchForm = $("#searchForm");
var jumbotron = $("#jumbotron");

function lastGet(artist) {
  var lastAPI = "7b47760fe2aa1770bcb7927be1cb9d72";
  var lastQuery = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + lastAPI + "&format=json";
  $.ajax({
    url: lastQuery,
    method:"GET"
  }).then(function(response){
    console.log(response.artist);
    var band = response.artist;
    var name = $("<h5 class='card-title'>");
    var bandDiv = $("<div class='card-body'>");
    var bandSum = $("<p class='card-text'>");
    name.append(band.name);
    bandSum.append(band.bio.summary);
    bandDiv.append(name, bandSum);
    $("#lastFM").append(bandDiv);
  });
}

function discGet(artist) {
  var discQuery = "https://api.discogs.com/database/search?artist=" + artist + "&key=" + discAPI + "&secret=" + discSecret;
  $.ajax({
    url: discQuery,
    method: "GET"
  }).then(function(response){
    var resultsGet = response.results;
    console.log(resultsGet);
    var img1 = $("<img src="+resultsGet[0].thumb+" />");
    var img2 = $("<img src="+resultsGet[1].thumb+" />");
    var img3 = $("<img src="+resultsGet[2].thumb+" />");
    var img4 = $("<img src="+resultsGet[3].thumb+" />");
    var img5 = $("<img src="+resultsGet[4].thumb+" />");
    var img6 = $("<img src="+resultsGet[5].thumb+" />");
    var title1 = $("<p class='title'>"+resultsGet[0].title+"</p>");
    var title2 = $("<p class='title'>"+resultsGet[1].title+"</p>");
    var title3 = $("<p class='title'>"+resultsGet[2].title+"</p>");
    var title4 = $("<p class='title'>"+resultsGet[3].title+"</p>");
    var title5 = $("<p class='title'>"+resultsGet[4].title+"</p>");
    var title6 = $("<p class='title'>"+resultsGet[5].title+"</p>");
    $("#albums").append(
      $("<div class='albumBox'>").append(img1, title1),
      $("<div class='albumBox'>").append(img2, title2),
      $("<div class='albumBox'>").append(img3, title3),
      $("<div class='albumBox'>").append(img4, title4),
      $("<div class='albumBox'>").append(img5, title5),
      $("<div class='albumBox'>").append(img6, title6),
    );
  });
}

function photoGet(artist){
  var query = "https://api.discogs.com/database/search?q=" + artist + "&key=" + discAPI + "&secret=" + discSecret;
  $.ajax({
    url: query,
    method: "GET"
  }).then(function(response){
    var res = response.results;
    console.log(res);
    var bandImg = $("<img class='card-image-top' alt='searched artist'>");
    bandImg.attr("src", res[0].cover_image);
    $("#lastFM").prepend(bandImg);
  })
}

function eventGet(artist){
  var eventAPI = "wfmwtNQxwTgGBgc5";
  var eventQuery = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search/?q="+artist+"&app_key="+eventAPI+"&scheme=https";
  $.ajax({
    url: eventQuery,
    method: "GET"
  }).then(function(response){
    var artistGet = JSON.parse(response);
    console.log(artistGet.events.event);
    showOneLat = artistGet.events.event[0].latitude;
    showOneLng = artistGet.events.event[0].longitude;
    showTwoLat = artistGet.events.event[1].latitude;
    showTwoLng = artistGet.events.event[1].longitude;
    showThreeLat = artistGet.events.event[2].latitude;
    showThreeLng = artistGet.events.event[2].longitude;
    var showOne = new google.maps.LatLng(showOneLat, showOneLng);
    var showTwo = new google.maps.LatLng(showTwoLat, showTwoLng);
    var showThree = new google.maps.LatLng(showThreeLat, showThreeLng);
    var mapOptions = {
      zoom: 3.5,
      center: {lat: 40, lng: -100}
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    markerOne = new google.maps.Marker({
      position: showOne,
      title: artistGet.events.event[0].venue_name + " " 
      + artistGet.events.event[0].venue_address + ", " 
      + artistGet.events.event[0].city_name + " "
      + artistGet.events.event[0].region_name
    });
    markerTwo = new google.maps.Marker({
      position: showTwo,
      title: artistGet.events.event[1].venue_name + " " 
      + artistGet.events.event[1].venue_address + ", " 
      + artistGet.events.event[1].city_name + " "
      + artistGet.events.event[1].region_name
    });
    markerThree = new google.maps.Marker({
      position: showThree,
      title: artistGet.events.event[2].venue_name + " " 
      + artistGet.events.event[2].venue_address + ", " 
      + artistGet.events.event[2].city_name + " "
      + artistGet.events.event[2].region_name
    });
    markerOne.setMap(map);
    markerTwo.setMap(map);
    markerThree.setMap(map);
  });
}

// function marketGet(artist) {
//   var marketQuery = "https://api.discogs.com/marketplace/listings/" + artist + "&key=" +discAPI + "&secret=" +discSecret;
//   $.ajax({
//     url: marketQuery,
//     method: "GET"
//   }).then(function(response){
//     console.log(response);
//   });
// }

function LinkFormatter(value, row, index) {
  var tableSearch = $("<div id='tableSearch'>"+value+"</div>");
  tableSearch.on("click", function(){
    lastGet(value);
    photoGet(value);
    discGet(value);
    eventGet(value);
    $("#lastFM").empty();
    $("#albums").empty();
  });
  return tableSearch;
}

$(document).ready(function(){
  results.addClass("d-none");
});

$("#searchButton").on("click", function(event){
  event.preventDefault();
  jumbotron.addClass("d-none");
  results.removeClass("d-none");
  searchForm.addClass("d-none");
  $("#searchButton").addClass("d-none");
  artist = $("#bandInput").val();
  photoGet(artist);
  lastGet(artist);
  discGet(artist);
  eventGet(artist);
  // marketGet(artist);
  database.ref().set({
    searchBand: artist
  });
  $("#resultsTable").removeClass("d-none");
  console.log(artist);
});

$("#newSearchButton").on("click", function(event){
  event.preventDefault();
  artist = $("#newBandInput").val();
  photoGet(artist);
  lastGet(artist);
  discGet(artist);
  eventGet(artist);
  // marketGet(artist);
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
  $("#albums").empty();
});