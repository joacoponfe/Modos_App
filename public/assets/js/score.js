import { urlFront } from "./config.js";

embed.loadFlatScore('6474c8199ba7d68e053993a3').then(function() {
    // Score loaded in the embed
}).catch(function(error) {
    // Unable to load the score
});

embed.pause().then(function () {
    // The playback is paused
});


embed.on('play', function () {
    console.log('User has started playing audio.');
    // Post message to parent window
    window.parent.postMessage({'message': 'play'}, '*');
});

embed.on('pause', function () {
    console.log('User has paused audio.');
    // Post message to parent window
    window.parent.postMessage({'message':'pause'}, '*');
});

embed.on('stop', function () {
    console.log('User has stopped audio.');
    // Post message to parent window
    window.parent.postMessage({'message': 'stop'}, '*');
});

embed.on('scoreLoaded', function () {
    console.log('A new score has been loaded.');
});

// Listen for messages from the parent window
window.addEventListener('message', function(event) {
    console.log(event.origin);
    if (event.origin === urlFront) {
      if (event.data['message'] === 'changeScore'){
        var sheetID = event.data['sheetID'];
        embed.loadFlatScore(sheetID).then(function() {
            // Score loaded in the embed
        }).catch(function(error) {
            // Unable to load the score
        });
      } else if (event.data['message'] === 'pauseScore'){
        embed.pause().then(function () {
            // The playback is paused
        });
      } else if (event.data['message'] === 'playScore'){
        embed.play().then(function () {
            // The playback is played
        });
      } else if (event.data['message'] === 'stopScore'){
        embed.stop().then(function () {
            // The playback is stopped
        });
      }
    } 
  });