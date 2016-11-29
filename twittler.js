$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  // Add a list to the body to append tweets to.
  var $tweetList = $('<ul></ul>');
  $tweetList.appendTo($body);

  var updateTweets = function() {
    $tweetList.html('');

    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $(
        '<li class="tweet">' +
          
          '<p class="tweet_heading">' + 
            '<span class="user">' + tweet.user + ' </span>' + 
            '<span class="tweeted_at">' + '@' + tweet.user + ' </span>' + 
            '<span class="created_at">' + tweet.created_at + '</span>' +
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
  };

  updateTweets();
  setInterval(updateTweets, 1000);
  

});