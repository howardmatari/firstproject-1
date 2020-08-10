var userSearch = $("#interest-input").val();

// create if/then statement for the audience size
var userDropdown = $("#audience-input");

function runSearch(event) {
    event.preventDefault();
    userSearch = $("#interest-input").val();
    console.log(userSearch);

var api = "EAAHZAICQklrQBALIZBr9gHclFRO0Tpb9ZBp220iyYKLaH85i4ELRYRERCVHDZAZA2wtyWsrlN21ayvQuDJvqoxoFZBBDyjqlagZCSLxxdZCWJYxyq486seSZCnMhTVRZAxjV8llZBij3lK6Qpi5sruapZCZAZB6MllDlcdSZCT4lqh7L7ZBRgHwZChUjNwgjn2YiZAI6r9GeeVpUINNkeCWRfU90Cu3KPJ";
var queryURL = "https://graph.facebook.com/search?type=adinterest&q=" + userSearch + "&limit=1000000&locale=en_US&access_token=" + api;

$("#form-button").click(function(event) {
    event.preventDefault();
    console.log("button clicked")

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
