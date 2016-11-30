$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  // Default tweetList display to the home screen (all tweets).
  var state = 'home';  

  // Add a list to the body to append tweets to.
  var $tweetList = $('<ul></ul>');
  $tweetList.appendTo($body);

  // Update tweets in tweetList
  var index;
  var updateTweets = function(currentUser) {
    $tweetList.html('');
    
    if (streams.users.hasOwnProperty(currentUser)) {
      index = streams.users[currentUser].length - 1;
    } else {
      index = streams.home.length - 1;
    }
    
    while (index >= 0) {
      var tweet;
      // tweet = currentUser === 'home' ? streams.home[index] : streams.users[currentUser][index];
      if (currentUser === 'home') {
        tweet = streams.home[index];
      } else {
        tweet = streams.users[currentUser][index];
      }

      var $tweet = $(
        '<li class="tweet">' +
          
          '<p class="tweet_heading">' + 
            '<span class="user">' + tweet.user + '</span>' + 
            '<span class="tweeted_at">' + ' @' + tweet.user + ' </span>' + 
            '<span class="created_at">' + jQuery.timeago(tweet.created_at) + '</span>' +
          '</p>' +

          '<p class="message">' + tweet.message + '</p>' +
  
          '<button class="btn btn-primary">' + 'Reply Icon' + '</button>' +
          '<button class="btn btn-success">' + 'Retweet Icon' + '</button>' +
          '<button class="btn btn-info">' + 'Like Icon' + '</button>' +
          '<button class="btn btn-warning">' + 'More Icon' + '</button>' +
  
        '</li>');
       
      $tweet.appendTo($tweetList);
      index -= 1;
    }

    var $usernames = $('.user');
    $usernames.click(refineTweetList);
  };

  var refineTweetList = function() {
    state = $(this).text();
    updateTweets(state);
  };

  updateTweets(state);
  setInterval(function() { updateTweets(state); }, 1000);
  
});