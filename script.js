/* eslint-disable prefer-const */
let userSearch = '';

$('#form-button').click(function(event) {
  event.preventDefault();
  userSearch = $('#interest-input').val();
  console.log(userSearch);
  const api = '929839847518989|KM6oRCTNsGmWUQahjuHZ5LON_nI';
  const queryURL = 'https://graph.facebook.com/search?type=adinterest&q=' + userSearch + '&limit=1000000&locale=en_US&access_token=' + api;
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET',
  })
      .then(function(response) {
        console.log(response);
        $('.results-wrapper').empty();
        for (let i = 0; i < response.data.length; i++) {
          const interest = response.data[i].name;
          const audience = response.data[i].audience_size;
          let breakpoint = $('#audience-input').val();
          console.log(breakpoint);
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
    const resultsInterest = $('<div>').addClass('results-interest').text(interest).attr('id', 'interest' + i);
    const resultsAudience = $('<div>').addClass('results-Audience').text(audience).attr('id', 'audience' + i);
    $("<div>")
    var resultsSearch = $("<div>").attr("query", userSearch).addClass("results-query")
    resultsCard.append(resultsSearch);


    $('.results-wrapper').append(resultsCard);
    resultsCard.append(resultsInterest).append(resultsAudience);

    const saveBtn = $('<button>').addClass('save-btn ghost-btn').text('Save');
    resultsCard.append(saveBtn);
  }
});

$(document).on('click', '.save-btn', function(event) {
  let parentClone = $(this).parent().clone();
  var query=parentClone.find(".results-query").attr("query")
  parentClone.append("User Search For " + query)
  $('.saved-interests').append(parentClone);
  $('.saved-interests .save-btn').remove();
});
