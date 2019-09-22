var player = [
    "Martin Brodeur", 
    "Martin St. Louis",
    "Willie O'Ree", 
    "Gary Bettman", 
    "Alexander Yakushev", 
    "Jayna Hefford", 
    "Mario Lemieux"];
    var hofImage = "";
function showButtons () {
    $("#buttonItems").empty();
    $("#hof-input").val("");
    for (var i = 0; i < player.length; i++) {
        var button = $("<button class='btn btn-dark'>");
      
        button.addClass("hof");
        button.attr("hof-name", player[i]);
        button.text(player[i]);
        $("#buttonItems").append(button);
        $("#buttonItems").append(" ");
    }
}
showButtons();
$("#addhofThing").on("click", function(event) {
    $("#submission").empty();
    event.preventDefault();
    var hofInput = $("#hof-input").val();
    var hofTerm = $(this).attr("hof-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hofInput + "&limit=5&api_key=dc6zaTOxFJmzC";
        $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
        if (response.pagination.total_count >= 1) {
            player.push(hofInput);
            showButtons(); }
            else if (response.pagination.total_count === 0) {
                $("#submission").html("No gifs currently.");}
        });
});

$(document).on("click", ".hof", display);
function display() {
    $("#submission").empty();
    var hofTerm = $(this).attr("hof-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hofTerm + "&limit=5&api_key=dc6zaTOxFJmzC";
    $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
        for (var j = 0; j < response.data.length; j++) {
            
            var active = response.data[j].images.fixed_width.url;
            var still = response.data[j].images.fixed_width_still.url;
            var rating = "Rating: " + (response.data[j].rating).toUpperCase();
            var hofImage = $("<img>");
            
           
            var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");
            
            hofImage.attr({"active":active, "still":still, "src":still, "state":"still"});
            var ratingAndImage = $("<div>");
            $(ratingAndImage).prepend(ratingDiv, hofImage);
            $("#ratings").prepend(ratingAndImage);
            $(hofImage).on("click", function(event) {

                $("#entry").empty();
                
                var state = $(this).attr("state");
                var source = $(this).attr("src");

                if (state === "still") {
                $(this).attr("src", $(this).attr("active"));
                $(this).attr("state", "active"); }
                else {
                $(this).attr("src", $(this).attr("still"));
                $(this).attr("state", "still"); } 
                 
            });
        }
   });
}

