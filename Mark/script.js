var userSearch;
// create if/then statement for the audience size
var userDropdown = $("#audience-input");

function runSearch(event) {
    event.preventDefault();
    userSearch = $("#interest-input").val();
    console.log(userSearch);

    var api = "EAAI0U589Q8gBALMnoZAyiUmp6nq6VlaZBdeLjG2aFdtK0F9l2eyOQoOPtk0NCjcPBAL4djPlZAaZAe5LZCCSvjVbva5C0tam8YGzgu0ZBmI4d0mQc0RqaFakCfJ4rV19lYhWdHLRWCxbl7edktVxZBLjnUkQbaz7lUzTVjLFccY7NKSEv4eWvcUkXdfQNx4NdcHPeteobTydgkTQCSkrvazI7eJldc95eSPX23kf4PExwZDZD";
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
            var id = response.data[i].id;
            
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
            resultsCard.append(id);

            var saveBtn = $("<button>");
            saveBtn.addClass("save-btn ghost-btn");
            saveBtn.text("Save");
            resultsCard.append(saveBtn);
        
            function saveCard (){
                //var savedCard = 
                $(resultsCard).appendTo("#interests-saved");
            }
             $(saveBtn).click(function(event) {
                 saveCard();
                $(resultsCard).text();
                localStorage.setItem("resultsCard", resultsCard);
                localStorage.getItem("resultsCard", resultsCard);
                
            }) 
         
        }
    })

    
    
}

$(".search-form").on("submit", runSearch)

