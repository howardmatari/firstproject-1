/* eslint-disable no-invalid-this */
/* eslint-disable indent */
/* eslint-disable prefer-const */
let userSearch = '';
let savedInterests = [];
let savedAudience = [];
let savedSearch = [];
// let savedImg = [];
let testImg = '';

function checkLocalStorage() {
  $('.saved-interests').empty();
  if (localStorage.getItem('savedInterestsKey')) {
    savedInterests = JSON.parse(localStorage.getItem('savedInterestsKey'));
    savedAudience = JSON.parse(localStorage.getItem('savedAudienceKey'));
    savedSearch = JSON.parse(localStorage.getItem('savedSearchKey'));
    // savedImg = JSON.parse(localStorage.getItem('savedImgKey'));
  }
}

function renderHistory() {
  $('.saved-interests').empty();
  for (let i = 0; i < savedInterests.length; i++) {
    const savedCardDiv = $('<div>').addClass('ui link cards card saved-card');
    const savedInterestsDiv = $('<div>').addClass('saved-interest').text(savedInterests[i]);
    const savedAudienceDiv = $('<div>').addClass('saved-audience').text('Audience size: ' + savedAudience[i]);
    const savedSearchDiv = $('<div>').addClass('saved-search').text('Term Searched: ' + savedSearch[i]);

    $('.saved-interests').append(savedCardDiv);
    savedCardDiv.append(savedInterestsDiv).append(savedAudienceDiv).append(savedSearchDiv);

    const delBtn = $('<button>').addClass('delete-btn ').text('Delete').attr('id', i);
    savedCardDiv.append(delBtn);
  }
}

function showLoader() {
  const loaderWrapper = $('<div>').addClass('loader');
  const segment = $('<div>').addClass('ui segment');
  const dimmer = $('<div>').addClass('ui active dimmer');
  const loader = $('<div>').addClass('ui text loader').text("Loading...");

  loader.appendTo(dimmer);
  dimmer.appendTo(segment);
  segment.appendTo(loaderWrapper);
  $('.results-wrapper').append(loaderWrapper);
}

$('#form-button').click(function(event) {
  event.preventDefault();
  $('.results-wrapper').empty();
  showLoader();

  userSearch = $('#interest-input').val();
  console.log(userSearch);
  const api = '929839847518989|KM6oRCTNsGmWUQahjuHZ5LON_nI';
  const queryURL = 'https://graph.facebook.com/search?type=adinterest&q=' + userSearch + '&limit=1000000&locale=en_US&access_token=' + api;

  // $('.results-wrapper') append a loading spinner here

  $.ajax({
    url: queryURL,
    method: 'GET',
  })
      .then(function(response) {
        console.log(response);
        $('.results-wrapper').empty();

        let queryIMGURL = 'https://api.unsplash.com/search/photos/?client_id=qL8izIA9NEwSW6c6h088pXUYyaki-T-0UoSqu_v74ro&page=1&per_page=1&query=' + userSearch;
        $.ajax({
          url: queryIMGURL,
          method: 'GET',
        })
            .then(function(response) {
                console.log(response);
                testImg = response.results[0].urls.full;
                // savedImg = response.results[0].urls.full;
                $('.hero-section').css('background-image', 'url(' + testImg + ')');
                return testImg;
            });

        for (let i = 0; i < response.data.length; i++) {
          let interest = response.data[i].name;
          const audience = response.data[i].audience_size;
          let breakpoint = $('#audience-input').val();
          if (breakpoint == 0) {
            appendResults(interest, audience, i);
          } else if (breakpoint == 1 && parseInt(audience) <= 50000) {
            appendResults(interest, audience, i);
          } else if (breakpoint == 2 && parseInt(audience) <= 100000 && parseInt(audience) > 50000) {
            appendResults(interest, audience, i);
          } else if (breakpoint == 3 && parseInt(audience) <= 500000 && parseInt(audience) > 100001) {
            appendResults(interest, audience, i);
          } else if (breakpoint == 4 && parseInt(audience) <= 1000000 && parseInt(audience) > 500001) {
            appendResults(interest, audience, i);
          } else if (breakpoint == 5 && parseInt(audience) <= 2000000 && parseInt(audience) > 1000001) {
            appendResults(interest, audience, i);
          }
        };
      });

  function appendResults(interest, audience, i) {
    const resultsWrapper = $('<div>').addClass('ui link cards');
    const resultsCard = $('<div>').addClass('card results-card').attr('data-general', i);
    const resultsInterest = $('<div>').addClass('results-interest').text(interest).attr('id', interest);
    const resultsAudience = $('<div>').addClass('results-Audience').text('Audience size: ' + audience).attr('id', audience);

    $('.results-wrapper').append(resultsWrapper);
    resultsWrapper.append(resultsCard);
    resultsCard.append(resultsInterest).append(resultsAudience);

    const saveBtn = $('<button>').addClass('save-btn').text('Save');

    resultsCard.append(saveBtn);
  }
});

function nameCheck(savedInterests, firstCheck) {
  for (let i = 0; i < savedInterests.length; i++) {
    if (firstCheck == savedInterests[i]) {
      savedInterests.splice(i, 1);
      savedAudience.splice(i, 1);
      savedSearch.splice(i, 1);
      // savedImg.splice(i, 1);
    }
  }
}

$(document).on('click', '.save-btn', function(event) {
  console.log(this.parentElement.children[0].id);
  let firstCheck = this.parentElement.children[0].id;

  nameCheck(savedInterests, firstCheck);

  savedInterests.push(firstCheck);
  console.log(this.parentElement.children[1].id);
  let secondChild = this.parentElement.children[1].id;
  savedAudience.push(secondChild);
  console.log(userSearch);
  savedSearch.push(userSearch);

  localStorage.setItem('savedInterestsKey', JSON.stringify(savedInterests));
  localStorage.setItem('savedAudienceKey', JSON.stringify(savedAudience));
  localStorage.setItem('savedSearchKey', JSON.stringify(savedSearch));
  // localStorage.setItem('savedImgKey', JSON.stringify(savedImg));

  renderHistory();
});

$(document).on('click', '.delete-btn', function(event) {
let delId = this.id;
savedInterests.splice(delId, 1);
savedAudience.splice(delId, 1);
savedSearch.splice(delId, 1);
// savedImg.splice(delId, 1); giving me a not a function error
localStorage.setItem('savedInterestsKey', JSON.stringify(savedInterests));
localStorage.setItem('savedAudienceKey', JSON.stringify(savedAudience));
localStorage.setItem('savedSearchKey', JSON.stringify(savedSearch));
// localStorage.setItem('savedImgKey', JSON.stringify(savedImg));
renderHistory();
});

checkLocalStorage();
renderHistory();