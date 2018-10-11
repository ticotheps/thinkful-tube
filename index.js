const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
var myKey = config.MY_KEY;

$(document).ready(function(){
  console.log("The web page has successfully loaded.");

  //  This hides the RESULTS divs upon initial loading of the page.
  $('.js-search-section').hide();

  //  This prevents the <form> element from default submission behavior.
  $(document).on('submit', '.js-search-form', function(event){
    console.log("A search query was submitted.");
    event.preventDefault();

    //  This creates a variable for the user's query.
    const searchQuery = $(event.currentTarget).find(".js-search-input");

    const searchWords = searchQuery.val();
    console.log(searchWords);

    //  This clears out the search input box.
    searchQuery.val("");

  });

});

//  This listens for submissions from the <form> element.
// function listenSubmit() {
//   $('.js-search-form').submit(function() {
//     console.log('Something was submitted.');
//   });
//
//   listenSubmit()

  // function getYouTubeData(searchTerm, callback) {
  //   const settings = {
  //     url: YOUTUBE_SEARCH_URL,
  //     part: 'snippet',
  //     key: myKey
  //     data: {
  //       q: `${searchTerm} in:name`,
  //       per_page: 7
  //     },
  //     dataType: 'json',
  //     type: 'GET',
  //     success: callback
  //   };
  //
  //   $.ajax(settings);
  // }
