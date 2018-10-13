const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const myKey = 'AIzaSyCgDg7VJayp6ckpidBxekWDs-Ur1u3sipw'

$(document).ready(function() {
  console.log("The webpage has completed it's initial loading.");

  //  This hides the content of the RESULTS section until data is gathered
  //  from the API.
  $('.results-section').hide();
})

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
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

function renderResult(result) {
  //  This displays the content of the RESULTS section because data has now been
  //  gathered from the API.
  $('.results-section').show();

  return `
    <div>
      <h4 class="js-video-title">${result.snippet.title}</h4>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}"
        target="_blank"><img class="js-thumbnail"
        src="${result.snippet.thumbnails.medium.url}"
        alt="Thumbnail of ${result.snippet.title} video">
      </a>
      <p class="js-channel-title">by ${result.snippet.channelTitle}</p>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
