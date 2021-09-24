/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {
  

  
const createTweetElement = function (tweetObject) {
  const $tweetDiv = $(`<article class="tweet"></article>`)
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
            ` ;
  $tweetDiv.html(markup) ;
  return $tweetDiv;
}

const renderTweets = function (tweetsArr) {
  tweetsArr.forEach(tweetObj => {
  const $newTweet = createTweetElement(tweetObj);
  $('#tweet-submitted').append($newTweet);
  }) 
}
//renderTweets(data);



//submitting to server via POST request

$('.container form').on ('submit', function(event) {
  
  event.preventDefault();

  const dataMain = ($(this).serialize());
  
//form validation
  if (dataMain.length > 140) {
    alert('Now you are just humming too much....')
  } else {
    
  $.post('/tweets', dataMain, function(data,status){
    data = dataMain;
    console.log("Data: " + data + "\nStatus: " + status);
    
  })
  }

});


const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
        console.log(res);
       renderTweets(res);
    }
});
}

loadTweets()




// document.ready end bracket
})



