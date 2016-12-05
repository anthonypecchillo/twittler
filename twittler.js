$(document).ready(function(){
  
  // Declare all variables
  var state = 'home';
  var index;
  // Declare HTML-generating selectors
  var $body = $('body');
  $body.html('');
  var $app = $('<div class="container">' + 
                 '<div class="row">' + 
                   '<div id="dashboard" class="col-md-3">Profile Here</div>' +
                   '<div id="feed" class="col-md-6"></div>' +
                   '<div id="otherJunk" class="col-md-3">Other Junk Here</div>' +
                 '</div>' +
               '</div>');
  $app.appendTo($body);
  var $dashboard = $('#dashboard');
  $dashboard.html('<a class="avatarLink">' + 
                    '<img class="avatarImg"></img>' +
                  '</a>' +

                  '<a>UserName</a>' +
                  '<a>@<span>UserName</span></a>' +

                  '<div>' + 
                    '<ul>' +
                      '<li>' +
                        '<a>' +
                          '<span>Tweets</span>' +
                          '<span>28</span>' +
                        '</a>' +
                      '</li>' +
                      '<li>' +
                        '<a>' +
                          '<span>Following</span>' +
                          '<span>10</span>' +
                        '</a>' +
                      '</li>' +
                      '<li>' +
                        '<a>' +
                          '<span>Followers</span>' +
                          '<span>11</span>' +
                        '</a>' +
                      '</li>' +
                    '</ul>' +  
                  '</div>');
  var $newTweets = $('<div id="newTweets"></div>');
  var $newTweetInput = $('<input></input>');
  var $newTweetButton = $('<button id="newTweetButton">Tweet!</button>');
  var $tweetList = $('<ul></ul>');

  // Declare dependent selectors
  var $feed = $('#feed');
  var $otherJunk = $('#otherJunk');
  var $avatarLink = $('.avatarLink');
  var $avatarImg = $('.avatarImg');

  // Append all components (Structure)
  $newTweets.appendTo($feed);
    $newTweetInput.appendTo($newTweets);
    $newTweetButton.appendTo($newTweets);
  $tweetList.appendTo($feed);

  
  // Declare all functions
  var addUserTweet = function() {
    var message = $newTweetInput.val();
    if (!message) {
      alert('Tweet cannot be blank!');
      return;
    }

    var tweet = {};
    tweet.user = 'Guest';
    tweet.message = message;
    tweet.created_at = new Date();

    streams.home.push(tweet);

    $newTweetInput.val('');
    updateTweets(state);   //Should I keep this here?
  };

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
  
          '<button class="btn btn-primary reply">' + 'Reply Icon' + '</button>' +
          '<button class="btn btn-success retweet">' + 'Retweet Icon' + '</button>' +
          '<button class="btn btn-info like">' + 'Like Icon' + '</button>' +
          '<button class="btn btn-warning more">' + 'More Icon' + '</button>' +
  
        '</li>');
       
      $tweet.appendTo($tweetList);
      index -= 1;
    }
    setupFeed();
  };

  var refineTweetList = function() {
    state = $(this).text();
    updateTweets(state);
  };  
  
  var hi = function() {           // Make this do something valuable!!!
    $(this).text('hi');
  };

  var setupFeed = function() {
    var $replyButton = $('.reply');
    var $retweetButton = $('.retweet');
    var $likeButton = $('.like');
    var $moreButton = $('.more');
    var $usernames = $('.user');

    $newTweetInput.attr('placeholder', 'Type Tweet Here!');
    
    $newTweetButton.click(addUserTweet);
    $usernames.click(refineTweetList);
    $replyButton.click(hi);           // Need the setInterval to stop when clicked!!!
    $retweetButton.click(hi);
    $likeButton.click(hi);
    $moreButton.click(hi);
  };


  // Create an init() function
  var init = function() {
    $avatarLink.attr('href', '#');
    $avatarImg.attr('src', 'samuel.jpg');
    // $newTweetInput.attr('placeholder', 'Type Tweet Here!');
    // $newTweetButton.click(addUserTweet);
    updateTweets(state);
    setInterval(function() { updateTweets(state); }, 5000);
  };
  
  // External/Global Event Handlers
  // $newTweetButton.click(addUserTweet);

  // Run init() 
  // $body.html('');
  // $avatarLink.attr('href', '#');
  // $avatarImg.attr('src', 'samuel.jpg');
  // $newTweetInput.attr('placeholder', 'Type Tweet Here!');

  init();

});