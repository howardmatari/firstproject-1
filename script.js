/* eslint-disable indent */
/* eslint-disable prefer-const */
let userSearch = '';
let savedInterests = [];
let savedAudience = [];
let savedSearch = [];
let testImg = '';

function checkLocalStorage() {
  $('.saved-interests').empty();
  if (localStorage.getItem('savedInterestsKey')) {
    savedInterests = JSON.parse(localStorage.getItem('savedInterestsKey'));
    savedAudience = JSON.parse(localStorage.getItem('savedAudienceKey'));
    savedSearch = JSON.parse(localStorage.getItem('savedSearchKey'));
  }
}

function renderHistory() {
  $('.saved-interests').empty();
  for (let i = 0; i < savedInterests.length; i++) {
    const savedCardDiv = $('<div>').addClass('card saved-card');
    const savedInterestsDiv = $('<div>').addClass('saved-interest').text(savedInterests[i]);
    const savedAudienceDiv = $('<div>').addClass('saved-audience').text('Audience size: ' + savedAudience[i]);
    const savedSearchDiv = $('<div>').addClass('saved-search').text(savedSearch[i]);

    $('.saved-interests').append(savedCardDiv);
    savedCardDiv.append(savedInterestsDiv).append(savedAudienceDiv).append(savedSearchDiv);

    const delBtn = $('<button>').addClass('save-btn ghost-btn').text('Delete');
    savedCardDiv.append(delBtn);
  }
}

$('#form-button').click(function(event) {
  event.preventDefault();
  userSearch = $('#interest-input').val();
  console.log(userSearch);
  const api = '929839847518989|KM6oRCTNsGmWUQahjuHZ5LON_nI';
  const queryURL = 'https://graph.facebook.com/search?type=adinterest&q=' + userSearch + '&limit=1000000&locale=en_US&access_token=' + api;
  $('.populate-results').empty();

  // $('.populate-results') append a loading spinner here

  $.ajax({
    url: queryURL,
    method: 'GET',
  })
      .then(function(response) {
        console.log(response);
        $('.populate-results').empty();

        let queryIMGURL = 'https://api.unsplash.com/search/photos/?client_id=qL8izIA9NEwSW6c6h088pXUYyaki-T-0UoSqu_v74ro&page=1&per_page=1&query=' + userSearch;
        $.ajax({
          url: queryIMGURL,
          method: 'GET',
        })
            .then(function(response) {
                console.log(response);
                testImg = response.results[0].urls.small;
                $('#testImg').attr('src', testImg);
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
    const resultsCard = $('<div>').addClass('card results-card').attr('data-general', i);
    const resultsInterest = $('<div>').addClass('results-interest').text(interest).attr('id', interest);
    const resultsAudience = $('<div>').addClass('results-Audience').text('Audience size: ' + audience).attr('id', audience);

    $('.populate-results').append(resultsCard);
    resultsCard.append(resultsInterest).append(resultsAudience);// append new div here;

    const saveBtn = $('<button>').addClass('save-btn ghost-btn').attr('value', 'save-btn').text('Save');
    resultsCard.append(saveBtn);
  }
});

// function nameCheck(event) {
//   for (let i = 0; i < savedInterests.length; i++) {
//     if (firstCheck == savedInterests[i]) {
//       savedInterests.splice(i, 1);
//     }
//   }
//   savedInterests.unshift(firstCheck);
// }

$(document).on('click', '.save-btn', function(event) {
  console.log(this.parentElement.children[0].id);
  let firstCheck = this.parentElement.children[0].id;
  savedInterests.push(firstCheck);
  console.log(this.parentElement.children[1].id);
  let secondChild = this.parentElement.children[1].id;
  savedAudience.push(secondChild);
  console.log(userSearch);
  savedSearch.push(userSearch);
  // nameCheck(firstCheck);

  localStorage.setItem('savedInterestsKey', JSON.stringify(savedInterests));
  localStorage.setItem('savedAudienceKey', JSON.stringify(savedAudience));
  localStorage.setItem('savedSearchKey', JSON.stringify(savedSearch));

  renderHistory();
  // }
  // let parentClone = $(this).parent().clone();
  // $('.saved-interests').append(parentClone);
  // $('.saved-interests .save-btn').remove();
});


checkLocalStorage();
renderHistory();


// "https://api.unsplash.com/search/photos/?client_id=qL8izIA9NEwSW6c6h088pXUYyaki-T-0UoSqu_v74ro&page=1&per_page=1&query=" + interest[i]

// query unsplash chris
// add imgs chris
// add delete btn to interest card chris
// use modal to display error chris
// change to other css library (semantic ui) micheal
// add keyword used to search term to interest card matari
// local storage save and load chris
// add explenation paragraph to top for users mark
// loading spinner mark
