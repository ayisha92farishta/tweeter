/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": '12 September 2021'
  }
]

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
              <h6>Posted <time class="timeago" datetime="${tweetObject.created_at}"></time> </h6>             
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
renderTweets(data)
} )



