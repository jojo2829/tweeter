/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  $(".error").hide();
  $("form").hide();

  $("#angle-down-form").click(function() {
    $("form").slideToggle();
  });

  //renders pre-exist tweet posts
  const renderTweets = function(tweets) {

    for (const tweet in tweets) {
      const $tweet = createTweetElement(tweets[tweet]);
      $('.articles-container').prepend($tweet);
    }
  };

  const createTweetElement = function(tweet) {
    let $cleanedText = $('<span></span>');
    $cleanedText.text(tweet.content.text);
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
          ${$cleanedText[0].innerHTML}
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
    const msg = unescape(data.slice(5));

    if (!msg || msg.length > 140) {
      return false;
    }
    return true;
  };

  //loads pre-exists tweets
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

  //loads new created tweet
  const newTweet = function() {
    const url = "/tweets";

    $.ajax({
      method:"GET",
      url
    })
    .then((result) => {
      const newTweet = result[result.length - 1];
      $('.articles-container').prepend(createTweetElement(newTweet));
    });
  };

  //submit new tweet
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
        $("#tweet-text").val("");
        $("#word-count").text("140");
        $(".error").hide();
      })} else {
        $(".error").slideDown();
    }
  });

  loadTweets();
});


