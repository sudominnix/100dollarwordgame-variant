
var playerscore = 0;  

//function for calculating word input value and putting in field
function sumUp(){
    var lettertotal = 0;
    var mainstring = document.getElementById("wordinput").value.toLowerCase(); 
    for (var i = 0; i < mainstring.length; i++) {
            var lettervalue = mainstring[i].charCodeAt() - 96;
            if (lettervalue < 0) {
                lettervalue = 0; }
            lettertotal = lettertotal + lettervalue;
    };
    $("#pointscore").text(lettertotal);
};

// function to choose and display a target value for which the player aims
// target range between 40 and 170
// rounds to the fives with math.floor method
function numberPick(){

    var target = Math.floor(((Math.random()*(130))+40)/5)*5;
    $("#target").text(target);
    if(target < 81) {
        range = 5;
    }
    else if (target < 141) {
        range = 10;
    }
    else {
        range = 15;
    }
    $("#plusminus").text(range);
};

// function to choose and display firstletter criterion
// the alphabet possibility -> stripping a few out like 'x' and 'q
function letterPick(){
    var alphaString = "abcdefghijklmnoprstuvwyz";
    var alphaArray = alphaString.split(""); 
    var positionNumber = Math.floor(Math.random() * (alphaString.length));
    var firstletter = alphaArray[positionNumber].toUpperCase();
    $("#firstletter").text(firstletter);
}

// function for evaluating a submitted word
function wordSubmit(candidate){
    $("#wordinput").val("");
    $("#feedback").val(" ");
    var candidateletter = candidate.split("");
    var candidateletter = candidateletter[0];
    var lettermatch = $("#firstletter").text().toLowerCase();
    if(candidateletter != lettermatch){
        // condition for first letter criterion evaluation
        $("#feedback").text("Remember to start with the same letter as the above!");
        return;
    }
    var workingpointscore = Number($("#pointscore").text());
    var workingtarget = Number($("#target").text());
    var workingplusminus = Number($("#plusminus").text());
    var upperlimit = workingtarget + workingplusminus;
    var lowerlimit = workingtarget - workingplusminus;
    if(workingpointscore>upperlimit || workingpointscore<lowerlimit) {
        // condition for value range criteria evaluation
        $("#feedback").text("Remember to keep your word value in the given range of the target!");
        return;
    }    
    
    //XML creation to check if candidate word is valid 
    //uses Dictionary.com API via Yahoo YQL xml file creator to bypass cross-domain issue
    //important note: in this code, the API key is nixed. You can get your own free one at Dictionary.com's dev site
    //the key should be placed in the below line where XXXXXXXXXXXXXXXXXXXX is (that's 20 X's) ... no spaces on either side and no other changes are necessary.
    
    var xmlhttp;
	xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET","https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.dictionaryapi.com%2Fapi%2Fv1%2Freferences%2Fcollegiate%2Fxml%2F"+candidate+"%3B%3Fkey%3DXXXXXXXXXXXXXXXXXXXX'&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;

	// SCAN XML FILE for a DT tag - present in a valid xml word def file, not on a rejected word

    if(xmlDoc.getElementsByTagName("dt").length == 0 )
    {
        $("#feedback").text("Sorry, word rejected by dictionary.");
        return;
    }

    //code to add points to score and append accepted word to right side list and then continue w/game
    valuedifference = Math.abs(workingpointscore - workingtarget);
    newpoint = 20 - valuedifference;
    completedright = candidate + " " + newpoint;
    $('.completed').append('<p class = "item">' + completedright + '</p>');
    playerscore = playerscore + newpoint;
    $("#score").html(playerscore);
    // various actions to calculate score and continue game play
    $("#feedback").text(" ");
    numberPick();
    letterPick();
}
    
// function for 'passing' on a criteria set
function wordpass(){
    $("#wordinput").val("");
    numberPick();
    letterPick();
    playerscore = playerscore - 10;
    $("#score").html(playerscore);
    $("#pointscore").text("0");
}

// function to start a new game: enable fields, timer/scores/criteria reset
function newgame(){
    numberPick();
    letterPick();
    playerscore = 0; 
    $("#score").text(playerscore);
    $("#wordinput").val("");
    $("#wordinput").prop('disabled', false);
    $(".item").remove();
    $(function(){
            // setting for timer plug in
	       $("#more_options").countdowntimer({
                minutes : 5,
                seconds : 0,
                size : "lg",
                timeUp : timeisUp
	       });
            function timeisUp() {
            // function to end game
                $("#wordinput").prop('disabled', true);
                $("#feedback").text("Game Over");
            }
    });
}

$(document).ready(function(){
    $("#wordinput").prop('disabled', true);
    // lock word input field initially
    numberPick();
    letterPick();
    $("#newbutton").on("click", newgame);
    $("#wordinput").on("keyup", sumUp);
    $("#passbutton").on("click", wordpass);
    $("#wordinput").keypress(function(event){
        // main function- calculating w/each keystore
	   var keycode = (event.keyCode ? event.keyCode : event.which);
	   if(keycode == '13'){
            var candidate = document.getElementById("wordinput").value.toLowerCase();
            wordSubmit(candidate);
	   }
    });
});

