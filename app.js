var data;
Parse.initialize('A8aZ7JDiA7xXVlB5W6d45KGQ02kQW2hY1i4U7kVr', 'cTue77sCi0KgfmLy9rglBxfP10RoF2uxSJjhuJfS');
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', ['ngRaty'])
var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items
      $scope.tracks.forEach(function(d){
        d.stars = d.popularity *0.05
      })
    })
  };

  $scope.rating = {
        current: 0,
        over: 0,
        out: 0
    };
    $scope.ratyOptions = {
        half: true,
        cancel: true,
        cancelOn: 'raty-2.7.0/lib/images/cancel-on.png',
        cancelOff: 'raty-2.7.0/lib/images/cancel-off.png',
        starHalf: 'raty-2.7.0/lib/images/star-half.png',
        starOff: 'raty-2.7.0/lib/images/star-off.png',
        starOn: 'raty-2.7.0/lib/images/star-on.png'
    };

  //$scope.imgNumber = 2;
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      //$scope.imgNumber = 2
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      //$scope.imgNumber = 1
      $scope.currentSong = song
    }
  }
  
  $scope.playlist = [];
  $scope.addSong = function(song) {
    if ($scope.playlist.indexOf(song) != -1) {
      alert("This song is already in your playlist")
    } else {
      $scope.playlist.push(song);
    }
  }

  $scope.removeSong = function(song) {
    $scope.playlist.splice($scope.playlist.indexOf(song), 1);
  }

  $(function() {
    var img = $("#plane"),
        width = img.get(0).width,
        screenWidth = $(window).width(),
        duration = 5000;

    function animatePlane() {
        img.css("left", -width)
           .animate({
                "left": screenWidth
            }, duration, animatePlane);
    }

    animatePlane();
})
  $(function() {
    var img = $("#plane2"),
        width = img.get(0).width,
        screenWidth = $(window).width(),
        duration = 5000;

    function animatePlane() {
        img.css("right", -width)
           .animate({
                "right": screenWidth
            }, duration, animatePlane);
    }

    animatePlane();
})
})

// Add tool tips to anything with a title property
/*$('body').tooltip({
    selector: '[title]'
});*/
