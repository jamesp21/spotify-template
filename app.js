var data;
var popular = 0;
Parse.initialize('A8aZ7JDiA7xXVlB5W6d45KGQ02kQW2hY1i4U7kVr', 'cTue77sCi0KgfmLy9rglBxfP10RoF2uxSJjhuJfS');
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
//var baseUrl2 = 'https://api.spotify.com/v1/search?type=artist&query='
var myApp = angular.module('myApp', [])
var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items
      
    })
  };

  $('form').submit(function(){
    $('#ratings').raty({ path: 'raty-2.7.0/lib/images', score: 5});//popular * 0.05});
  //console.log(ratings)
  })
  $scope.imgNumber = 2;
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.imgNumber = 2
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.imgNumber = 1
      $scope.currentSong = song
    }
  }
  
  //$scope.view = function()  {
     //console.log(imageObject);
    // console.log($scope);
    /*for(var i = 0; i < $scope.tracks.length; i++) {
      // console.log($scope.tracks[i]);
      console.log(i);
      if(imageObject.images[0].url == $scope.tracks[i].album.images[0].url ||
        imageObject.images[1].url == $scope.tracks[i].album.images[1].url ||
        imageObject.images[2].url == $scope.tracks[i].album.images[2].url) {
        $scope.tracks[i].album.images=0;
        console.log($scope.tracks[i].album.images);
        break;
      }*/
   /* if($scope.imgNumber == 0) {
      $scope.imgNumber = 2
    }else {
       $scope.imgNumber = 0;
    }

    //console.log($scope.imgNumber);
  }*/
})

var Playlist = Parse.Object.extend('Playlist');
// Click event when form is submitted
$('form').submit(function() {
  // Create a new instance of your Playlist class 
  var playlist = new Playlist();
  // For each input element, set a property of your new instance equal to the input's value
  //Set a property 'name' equal to a name of playlist name
  playlist.set('name', $(name).val());
  //Set a property 'songs' equal to the songs
  playlist.set('songs', $(songs).val());
  //Set a property 'song' equal to the song
  playlist.set('song', $(song).val());
  // Set a property 'duration' equal to a duration
  playlist.set('duration', 0);
  $(name).val(" ");
  $(songs).val(" ");
  // Save your instance of your review -- and go see it on parse.com!
  playlist.save(null, {
    success:getData
  });
  // After setting each property, save your new instance back to your database
  return false;
})

  // Write a function to get data
var getData = function() {
  // Set up a new query for our Playlist class
  var query = new Parse.Query(Playlist);
  // Set a parameter for your query -- where the name property isn't missing
  //query.exists('website'); or
  query.notEqualTo('name', ' ');
  /* Execute the query using ".find".  When successful:
      - Pass the returned data into your buildList function
  */
  query.find({
    success:buildList
  })
}

// A function to build your list
var buildList = function(data) {
  // Empty out your unordered list
  $('ol').empty()
  // Loop through your data, and pass each element to the addItem function
  data.forEach(function(d){
    addItem(d);
  })
}

// This function takes in an item, adds it to the screen
var addItem = function(item) {
  // Get parameters (website, band, song) from the data item passed to the function
  //totalReviews++;
  var name = item.get('name');
  var songs = item.get('songs');
  var song = item.get('song');
  var duration =item.get('duration');
    //totalRatings += ratings;
    //averageRatings = totalRatings / totalReviews;
  // Append li that includes text from the data item
  var li = $('<div class="sections"><p>' + name + '<br>'  + song + '<br><p></div>');
  var time = $('<span id="duration">').duration;
  var button = $('<button class ="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>')
  button.click(function(){
    item.destroy({
      success:getData
    })
  })
  li.prepend(time);
  li.append(button);
  $('ol').append(li)
  $('create').click(function () {
    item.set('name', $scope.track.name)
    item.increment('songs');
    item.set('song', $track.preview_url)
    item.save(null, {
      success:getData
    })
  })
  // $('.down-vote').click(function () {
  //   item.increment('down');
  //   item.save(null, {
  //     success:getData
  //   })
  // })
  if (item.get('songs') != 0) {
    var message = "";
    if (total == 1){
      message += "1 song " + duration + " minutes";
    }else {
    message += songs + " songs " + duration + " minutes";
    }
    li.append(message);
  }
  // Time pending, create a button that removes the data item on click
}
// Call your getData function when the page loads
getData();
// Add tool tips to anything with a title property
/*$('body').tooltip({
    selector: '[title]'
});*/
