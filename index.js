const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

$(document).ready(function(){
  console.log('The web page has successfully loaded.');

  function getYouTubeData(searchTerm, callback) {
    const settings = {
      url: YOUTUBE_SEARCH_URL,
      part: 'snippet',
      key: 'AIzaSyCgDg7VJayp6ckpidBxekWDs-Ur1u3sipw',
      data: {
        q: `${searchTerm} in:name`,
        per_page: 7
      },
      dataType: 'json',
      type: 'GET',
      success: callback
    };

    $.ajax(settings);
  }
})
