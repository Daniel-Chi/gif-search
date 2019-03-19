//initial topics array
let topics = ["Adventure Time", "The Simpsons", "Spongebob Squarepants", "The Boondocks", "Regular Show", "Samurai Jack", "Scooby Doo", "South Park", "Spiderman", "Family Guy"];
let topicslowercase = [];
//current gifs arrays
let urlstill = [];
let urlactive = [];
//creates new button using str
function newbtn(str) {
    let newbtn = $("<button>").addClass("btn btn-info topbtn").text(str).attr("name", str.toLowerCase());
    $("#btns").append(newbtn);
};
//initial load
for (i = 0; i < topics.length; i++) {
    newbtn(topics[i]);
    topicslowercase.push(topics[i].toLowerCase())
};
//function to load gifs
function gifload(str) {
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cGcH9tjBLu2GddQkvgvJX4ctXpjrMMC5&q="
        + str +
        "&limit=10&offset=0";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let arr = response.data
        $("#gifs").empty();
        urlstill = [];
        urlactive = [];
        for (i = 0; i < arr.length; i++) {
            urlstill.push(arr[i].images.fixed_height_still.url);
            urlactive.push(arr[i].images.fixed_height.url);
            let rating = $("<div>").text("Rating: " + arr[i].rating);
            let gif = $("<img>").attr("src", urlstill[i]).addClass("static").attr("index", i);
            $("#gifs").append($("<div>").append(rating).append(gif));
            giflistener(gif);
        };
    });
};
//search button click
$("#searchbtn").on("click", function (evt) {
    evt.preventDefault();
    let query = $("#query").val().trim();
    if (query != "" && topicslowercase.indexOf(query.toLowerCase()) === -1) {
        topicslowercase.push(query.toLowerCase());
        newbtn(query);
        gifload(query);
        btnlistener();
    };
});
//loaded button click
function btnlistener() {
    $(".topbtn").on("click", function () {
        gifload(this.name)
    });
};
btnlistener();
//gif toggle listener
function giflistener(target) {
    target.on("click", function (evt) {
        //read which gif was clicked
        let ind = parseInt(target[0].attributes[2].nodeValue)
        //if clicking static, change to active
        if (evt.target.className === "static") {
            evt.target.className = "active";
            target[0].src = urlactive[ind];
        }
        //if clicking active, change to static
        else {
            evt.target.className = "static";
            target[0].src = urlstill[ind];
        };
    });
};