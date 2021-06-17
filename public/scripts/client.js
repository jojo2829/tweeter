/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const renderTweets = function(tweets) {
    
    for (const tweet in tweets) {
      const $tweet = createTweetElement(tweets[tweet]);
      $('.articles-container').prepend($tweet);
    }
  };
    
  const createTweetElement = function(tweet) {

    let $tweet = $(`
      <article class="tweet">
        <header>
          <div class="article-profile">
            <img src="${tweet.user.avatars}">
            <span>${tweet.user.name}</span>
          </div>
          <span class="article-user-id"><b>${tweet.user.handle}</b></span>
        </header>
        <p>
          ${tweet.content.text}
        </p>
        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <div class="article-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  const validateForm = function(data) {
    const msg = data.slice(5);

    if (!msg || msg.length > 140) {
      return false;
    }
    return true;
  };

  const loadTweets = function() {
    const url = "/tweets";

    $.ajax({
      method: "GET",
      url
    })
    .then((result) => {
      renderTweets(result);
    })
    .catch(err => {
      console.log(err);
    });
  };

  const newTweet = function() {
    const url = "/tweets";

    $.ajax({
      method:"GET",
      url
    })
    .then((result) => {
      const newTweet = result[result.length - 1];
      console.log("current result: ", newTweet);
      $('.articles-container').prepend(createTweetElement(newTweet));
    });
  };

  $("form").submit(function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    const url = "/tweets";

    if (validateForm(data)) {
      $.ajax({
        method: "POST",
        url,
        data: data
      })
      .then(() => {
        newTweet();
        $("form").trigger("reset");
      });
    } else {
      alert("Tweet cannot be empty or over 140 characters!");
    }
  });
  loadTweets();
});


