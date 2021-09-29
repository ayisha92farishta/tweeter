/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {
  // hides error message by default
  $('.error-msg').hide();

  //hides forms by default
  $('.container form').hide();

  //clicking the down arrow key makes the form to appear and dissapear.
  $('#down-arrow').on('click', function() {
 
    $('html, body').animate({scrollTop: '0px'}, 300);
    $('.container form').toggle('500');

  });

  //takes in tweet object and convert it into markup
  const createTweetElement = function(tweetObject) {
    const $tweetDiv = $(`<article class="tweet"></article>`);
    const markup =
        `<header>
              <h4>
              <img src="${tweetObject.user.avatars}" >
               ${tweetObject.user.name}
               </h4>
              <h4 class="handle"> 
              ${tweetObject.user.handle}
              </h4>
            </header>
            <p name="text" class="tweet" >
            ${tweetObject.content.text}
             </p>
            <footer>   
              <h6>Tweeted ${timeago.format(tweetObject.created_at)} </h6>             
              <ul>
                <li><i class="fas fa-flag"></i></li>
                <li><i class="fas fa-retweet"></i></li>
                <li><i class="far fa-heart"></i></li>
              </ul>
            </footer>
            `;
    $tweetDiv.html(markup);
    return $tweetDiv;
  };

  //takes in an array of tweet objects and append them inside the div with id #tweet-submitted
  const renderTweets = function(tweetsArr) {
    const newArr = tweetsArr.reverse();
    newArr.forEach(tweetObj => {
      const $newTweet = createTweetElement(tweetObj);
      $('#tweet-submitted').append($newTweet);
    });
  };


  //submitting to server via POST request

  $('.container form').on('submit', function(event) {
  
    //prevents default behaviour
    event.preventDefault();
  
    //serialize the data - creates a text string in standard URL-encoded notation by serializing form values.
    const dataMain = ($(this).serialize());
  
    //form validation
    if (dataMain.length > 140) {

      //error message shows up
      $('.error-msg .error-text').text('We can only take so much humming, please stay within the character limit.');
      $('.error-msg').slideDown('300');
    }  else {
    //error message goes away
      $('.error-msg').slideUp('300');
        
      //ajax post request to the server

      $.post('/tweets', dataMain, function(data,status) {
        loadTweets();
        $('.container form textarea').val('');
      });
  
    }

  });

  //function to load all tweets submitted using
  // 1. ajax get request to pull in data from server
  // 2. then feeding that information to renderTweets() function
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        $('#tweet-submitted').empty();
        renderTweets(res);
      }
    });
  };

  loadTweets();




// document.ready end bracket
});



