var userSearch;
// create if/then statement for the audience size
var userDropdown = $("#audience-input");

function runSearch(event) {
    event.preventDefault();
    userSearch = $("#interest-input").val();
    console.log(userSearch);

    var api = "EAAHZAICQklrQBAN983zCvErMzRX2ZBHS6uwVLIeKL7KRpec0fTJAMRcGtIOlZCPcyYk7YUQ0dFQcmQjpnWsbw5ZBxdGeUgQqJufGtaaaX0ilTcEH4rY3cSBZBd0OITBSO7mpSJlfNxGebZAGPvWfevtFw2YYIsq0pNLKRgMhG5nWCZA3m0hZC4d2mtHJo60EQVKWDjgKaVeYkfTKNKMAW15j";
    var queryURL = "https://graph.facebook.com/search?type=adinterest&q=[" + userSearch + "_]&limit=1000000&locale=en_US&access_token=" + api;
    
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"

    })

    .then(function(response){
        console.log(response);

        for (var i=0; i<response.data.length; i++) {
            var interest = response.data[i].name;
            var audience = response.data[i].audience_size;
    
            console.log(interest)

            var resultsCard = $("<div>");
            resultsCard.addClass("card results-card");
            var resultsInterest = $("<div>");
            resultsInterest.addClass("results-interest");
            resultsInterest.text(interest);
            var resultsAudience = $("<div>");
            resultsAudience.addClass("results-Audience");
            resultsAudience.text(audience);

            $(".results-wrapper").append(resultsCard);
            resultsCard.append(resultsInterest);
            resultsCard.append(resultsAudience);

            var saveBtn = $("<button>");
            saveBtn.addClass("save-btn ghost-btn");
            saveBtn.text("Save");
            resultsCard.append(saveBtn);
        }
    })

    
    
}

$(".search-form").on("submit", runSearch)

