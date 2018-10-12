const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
var myKey = 'AIzaSyCgDg7VJayp6ckpidBxekWDs-Ur1u3sipw';

$(document).ready(function(){
  console.log("The web page has successfully loaded.");

  //  This hides the RESULTS section element upon initial loading of the page.
  $(".js-search-section").hide();

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

    getYouTubeData(searchWords, displayYouTubeData);
  });

});

  function getYouTubeData(searchTerm, callback) {
    console.log("The getYouTubeData function is running.");

    const settings = {
      url: YOUTUBE_SEARCH_URL,
      data: {
        part: "snippet",
        key: myKey,
        q: `${searchTerm} in:name`,
        per_page: 5
      },
      dataType: 'json',
      type: 'GET',
      success: callback
    };

    $.ajax(settings);
  }

  function displayYouTubeData(data) {
    console.log(`The API was successful in retrieving data and the
      displayYouTubeData function is running.`);

    //  This displays the RESULTS section element on the page.
    $(".js-search-section").show();

    const results = data.items.map(item, index);
    console.log(results);

    // $('.js-search-results').html(results);
  }

  // function renderResult(result) {
  //   return `
  //   <div>
  //     <h2>
  //     <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a> by <a class="js-user-name" href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></h2>
  //     <p>Number of watchers: <span class="js-watchers-count">${result.watchers_count}</span></p>
  //     <p>Number of open issues: <span class="js-issues-count">${result.open_issues}</span></p>
  //   </div>
  // `;
  // };
