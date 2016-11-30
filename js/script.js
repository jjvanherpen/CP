// slider functie
// Slide to Unlock w/ HTML5 Range - CodePen
// Url : http://codepen.io/AnandChowdhary/pen/tEkGo
// Auteur : Anand Chowdhary


document.querySelector("input[type=\"range\"]").onmouseup = function () {
    var theRange = this.value;
    if (theRange == 100) {

        unlock();

    } else {
        document.init = setInterval(function () {
            if (document.querySelector("input[type=\"range\"]").value != 0) {
                document.querySelector("input[type=\"range\"]").value = theRange--;
            }
        }, 1);
    }
}

document.querySelector("input[type=\"range\"]").onmousedown = function () {
    clearInterval(document.init);
}

function unlock() {
    document.querySelector("input[type=\"range\"]").style.display = 'none';
    document.getElementById("iphone_lockscreen").style.display = 'none';
}

// einde slider functie


//for(var i=0; I<levels[indexVanLevel].naamVanArray.length; i++){
//var iconIndex= levels[indexVanLevel].naamVanArray[i];
//icons[iconIndex]
//icons.prototype.duplicate = function () {
//
//  for (var i = 0, il = this.length; i < il; ++i) {
//
//    this.push(this[i]);
//  }
//
//  return this;
//};
//var icons = [1,2,3,4,5];



// variable  is gevuld met plaatjes icons1.png 1=val
// 
var icons;
// icons[0] = [1, 1, 2, 2, 3, 3, 4, 4];                                                          //level 1
// icons[1] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];                                                  //level 2
// icons[2] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];                                          //level 3, enz
// icons[3] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
// icons[4] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];
// icons[5] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15];

//slaat icons op in localStorage, moet straks uit een xml o.i.d. komen

// var array = [
// 	[0,1,2],
// 	[3,4,5]
// ];

$.getJSON('data.json', function(data){
    console.log(data);
    console.log('first row, first column', data[0][0]);
    console.log('last row, last column', data[5][29]);

    icons = data;
    initialize();
});


function initialize() {

    var currentlevel = 0;
    var icon_value = [];
    var icon_ids = [];
    var icons_flipped = 0;
    var matchCount = 0;
    var highScores = [['naam', 20, 9]]
    var levels = data;//haalt je levels op uit localstorage, moet dus uit die xml komen straks.

    if (localStorage.getItem("highScores") === null) {
        localStorage.setItem('highScores', JSON.stringify(highScores));
        console.log(localStorage.setItem("highScores"));
    }


// prototype ---------------------------------

// Voegt een functie toe aan de Array-class
// Deze fuctie shuffled een array
    Array.prototype.shuffleMode = function () {
        var i = this.length, j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this[j];
            this[j] = this[i];
            this[i] = temp;
        }
    }

    Array.prototype.sortBySecondElement = function () {
        this.sort(function (a, b) {
            return a[1] - b[1]
        })
    }
// prototype ---------------------------------


    function newBoard() {            // hier wordt een nieuwe canvas(board) gecreeerd
        icons_flipped = 0;         // met begint met 0 icons geflipt
        var output = '';
        levels[currentlevel].shuffleMode();                                  // daarna laadt hij de huide level en shuffeld hij deze met de bovenstaande protype (shuffleMode)
        for (var i = 0; i < levels[currentlevel].length; i++) {               // hier kijkt hij naar hoeveel items in een array zit
            output += '<div id="icon_' + i + '" onclick="Flipicon(this,\'' + levels[currentlevel][i] + '\')"></div>'; // zodat hij weet hoeveel div hij moet maken met een unieke id en stopt het in de output
        }
        matchCount = 0;
        document.getElementById('status_bar').innerHTML = '<h1>Start!</h1>';
        document.getElementById('canvas').innerHTML = output; // gooit hij alles in de index.hmtl met de div naam canvas
        showHighScores();
    }


    function showHighScores() {
        getHighScores();
        highscores.sortBySecondElement();
        document.getElementById('highscores').innerHTML = getHighScoresHtml();
    }

    function getHighScores() {
        highscores = JSON.parse(localStorage.getItem('highScores'));
        return highscores;
    }

    function filterHighscores() {
        var filteredHighscores = highscores.filter(
            function (obj) {
                return obj[2] == currentlevel;
            });
        highscores = filteredHighscores;
        higscores = highscores.slice(0, 1);
        return filteredHighscores;
    }

    function sendHighscoreToServer() {
        var newHighScores = getHighScores()
        newHighScores.push(["Michael", matchCount, currentlevel]);
        localStorage.setItem('highScores', JSON.stringify(newHighScores));
    }

    function getHighScoresHtml() {
        filterHighscores();
        var output = '<h2>Level ' + (currentlevel + 1) + '</h2><h4>Highscores: </h4><ol>'
        for (i = 0; i < highscores.length; i++) {
            output += '<li>' + highscores[i][0] + ' ' + highscores[i][1] + '</li>'
        }
        //highscores.forEach(output += '<li>'+ this[0]+ ' ' + this[1] + ' ' + this[2] + '</li>');
        output += "</ol>";
        return output;
    }

    function Flipicon(icon, val) {
        if (icon.innerHTML == "" && icon_value.length < 2) {  // als html leeg is en icon val kleiner is dan 2 dan begint de funtie te lopen
            icon.innerHTML = '<img src="css/images/icons/icons' + val + '.png"/>'; // hier wordt de html opgemaakt met een plaatje val staat gelijk aan de nummer van het plaatje val(1) = icons(1).png

            matchCount++;
            document.getElementById('status_bar').innerHTML = '<h1>Aantal kliks: ' + matchCount + '</h1>';
            icon_value.push(val); // pushen val en id naar array
            icon_ids.push(icon.id);

            if (icon_value.length == 2) { // controleren of er al twee icon_values zijn
                checkIfMatch();
            }
        }
    }

    function checkIfMatch() {
        if (icon_value[0] == icon_value[1]) { // als iconen de zelfde value hebben dan bijven deze geflipt en wordt er + 2 bij de array icons_flipped gedaan
            icons_flipped += 2;    // een wordt de value en id array weer leeg gemaakt

            icon_value = [];
            icon_ids = [];


            if (icons_flipped == levels[currentlevel].length) {  // als de icons_flipped de zelfde aantal heeft als de lengte van de icons dan is het spel klaar
                alert("Je hebt alle iconen gevonden in " + matchCount + " clicks");        // en wordt er een nieuwe canvas/board gemaakt
                sendHighscoreToServer();
                if (currentlevel < 6) {
                    currentlevel = currentlevel + 1;
                }
                document.getElementById('canvas').innerHTML = "";
                newBoard();
            }
        }

        else {
            function flipterug() { // als geen match is dan wordt icon terug geflipt (0,5 sec)  met html opmaak en de value en id weer leeg gemaakt
                var icoon_1 = document.getElementById(icon_ids[0]);
                var icoon_2 = document.getElementById(icon_ids[1]);

                icoon_1.style.background = 'url(css/images/icons/icons0.png) no-repeat';
                icoon_1.innerHTML = "";

                icoon_2.style.background = 'url(css/images/icons/icons0.png) no-repeat';
                icoon_2.innerHTML = "";

                icon_value = [];
                icon_ids = [];
            }

            setTimeout(flipterug, 500);

        }
    }

    newBoard();
}