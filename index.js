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
    <div class="js-video-result">
      <div class="js-video-banner">
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}"
          target="_blank"><img class="js-thumbnail"
          src="${result.snippet.thumbnails.default.url}"
          alt="Thumbnail of ${result.snippet.title} video">
        </a>
        <h4 class="js-video-title">${result.snippet.title}</h4>
      </div>
      <iframe width="560" height="315"
        src="https://www.youtube.com/embed/${result.id.videoId}"
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
      </iframe>
      <p class="js-channel-title">Check out more videos from the <a
        href="https://www.youtube.com/channel/${result.snippet.channelId}"
        target="_blank">
        ${result.snippet.channelTitle}</a> YouTube Channel</p>
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
