
var userSearch = $("interest-input").val();
// create if/then statement for the audience size
var userDropdown = $("audience-input");


var api = "EAAHZAICQklrQBALIZBr9gHclFRO0Tpb9ZBp220iyYKLaH85i4ELRYRERCVHDZAZA2wtyWsrlN21ayvQuDJvqoxoFZBBDyjqlagZCSLxxdZCWJYxyq486seSZCnMhTVRZAxjV8llZBij3lK6Qpi5sruapZCZAZB6MllDlcdSZCT4lqh7L7ZBRgHwZChUjNwgjn2YiZAI6r9GeeVpUINNkeCWRfU90Cu3KPJ";
var queryURL = "https://graph.facebook.com/search?type=adinterest&q=[" + userSearch + "_]&limit=1000000&locale=en_US&access_token=" + api;

function runSearch(event) {
    event.stopDefault();

}
//comment sample change//
$("search-form").on("click", runSearch)