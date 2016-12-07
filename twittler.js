$(document).ready(function(){
  
  var $tweetList = $('#tweetList');
  var $newTweetInput = $('#newTweetInput');
  var $newTweetButton = $('#newTweetButton');

  var selectedUser;

  function getSelectedTweets() {
    if (streams.user.hasOwnProperty(selectedUser)) {
      return streams.users[selectedUser];
    }
    return streams.home;
  }

  // Demo function for button clicks at the bottom of a tweet.  Change Later.
  function hi() {
    var elemId = $(this).parent().attr('id');
    var tweetId = partseInt(elemId.replace('tweet-', ''));
    var tweets = getSelectedTweets();
    var tweet = tweets[tweetId];
    console.log("hi", tweet);
  }

  var onReplyClick = hi;
  var onRetweetClick = hi;
  var onLikeClick = hi;
  var onMoreClick = hi;

  function onNewTweetClick() {
    var message = $newTweetInput.val();
    if (!message) {
      alert('Tweet cannot be blank!');
      return;
    }

    var tweet = {};
    var userName = 'Guest';
    tweet.user = userName;
    tweet.message = message;
    tweet.created_at = new Date();

    streams.home.push(tweet);
    if (!streams.users.hasOwnProperty(userName)) {
      streams.users[userName] = [];
    }
    streams.users[userName].push(tweet);

    $newTweetInput.val('');
    createTweetList(selectedUser);
  }

  function onUserClick() {
    $tweetList.html('');
    selectedUser = $(this).text().trim();
    createTweetList(selectedUser);
    // createDashboard();                This function is not yet defined!
  }

  function createTweet(tweet, index) {
    return $(
      '<li class="tweet" id="tweet-' + index + '">' +
        '<p class="tweet_heading">' +
          '<span class="user">' + tweet.user + '</span>' +
          '<span class="tweeted_at">@' + tweet.user + '</span>' +
          '<span class="created_at">' + $.timeago(tweet.created_at) + '</span>' +
        '</p>' +
        '<p class="message">' + tweet.message + '</p>' +
        '<button class="btn btn-primary reply">Reply Icon</button>' +
        '<button class="btn btn-success retweet">Retweet Icon</button>' +
        '<button class="btn btn-info like">Like Icon</button>' +
        '<button class="btn btn-warning more">More Icon</button>' +
      '</li>'
    );
  }

  function createTweetList(currentUser) {
    var tweets = getSelectedTweets();
    var newTweets = [];

    for (var i = tweets.length - 1; i >= 0; i--) {
      if ($('#tweet-' + i).length === 0) {
        var tweet = tweets[i];
        var $tweet = createTweet(tweet, i);
        newTweets.push($tweet);
      }
    }
    $tweetList.prepend(newTweets);

    $('button.reply').click(onReplyClick);
    $('button.retweet').click(onRetweetClick);
    $('button.like').click(onLikeClick);
    $('button.more').click(onMoreClick);
    $('span.user').click(onUserClick);
  }

  function createDashboard(link, img) {
    $('#avatarLink').attr('href', '#');
    $('#avatarImg').attr('src', 'samuel.jpg');
  }

  $newTweetButton.click(onNewTweetClick);

  createDashboard();
  createTweetList();
  setInterval(function() { createTweetList(selectedUser); }, 5000);
});