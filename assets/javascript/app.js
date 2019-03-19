//initial topics array
let topics = ["Adventure Time", "The Simpsons", "Spongebob Squarepants", "The Boondocks", "Regular Show", "Samurai Jack", "Scooby Doo", "South Park", "Spiderman", "Family Guy"];
//creates new button using str
function newbtn(str) {
    let newbtn = $("<button>").addClass("btn btn-info").text(str).attr("name", str.toLowerCase());
    $("#btns").append(newbtn);
};
//initial load
for (i = 0; i < topics.length; i++) {
    newbtn(topics[i]);
};
//function to load gifs
function gifload(str) {
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cGcH9tjBLu2GddQkvgvJX4ctXpjrMMC5&q="
                    +str+
                    "&limit=10&offset=0";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
    });
};
//search button click
$("#searchbtn").on("click", function (evt) {
    evt.preventDefault();
    let query = $("#query").val().trim();
    newbtn(query);
    gifload(query);
});
